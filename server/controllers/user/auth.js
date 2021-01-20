const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const CustomDate = require('../../utils/date');
const Email = require('../../utils/email');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new CustomDate().addDays(process.env.JWT_COOKIE_EXPIRES_IN).date,
    httpOnly: false,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  if (res.res) {
    res.res.cookie('jwt', token, cookieOptions);
  } else {
    res.cookie('jwt', token, cookieOptions);
  }

  return token;
};

exports.signinWithOAUTH = catchAsync(async (req, res, next) => {
  createSendToken(req.user, req, res);

  const { redirectTo } = req.cookies;
  res.clearCookie('redirectTo');
  res.redirect(redirectTo);
});

exports.signinWithPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide an email and a password', 400));
  }

  // 2) Check if user exist && password is correct
  const user = await User.query()
    .context({ getAllFields: true })
    .findOne({ email: email })
    .withGraphFetched('address.city.province');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect user o password', 401));
  }

  // 3) Update lastLogin
  await user.$query().patch({ lastLogin: new CustomDate().ISO() });

  // 4) If everything ok, send token to client
  const token = createSendToken(user, res);

  // 5) Remove the password from the output
  user.password = undefined;
  user.passwordResetToken = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.signupWithPassword = catchAsync(async (req, res, next) => {
  // TODO: Email de confirmacion de cuenta

  // 1) Password Validation
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Los passwords ingresados no coinciden!', 400));
  }

  const newUser = await User.query().insert({
    email: req.body.email,
    password: req.body.password,

    displayName: req.body.displayName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,

    // TODO: Pedir Telefono y Direccion en paso posterior para no abrumar a usuario
  });

  const token = createSendToken(newUser, res);

  // 5) Remove the password from the output
  newUser.password = undefined;
  newUser.passwordResetToken = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user
  const user = await User.query().findOne({ email: req.body.email });

  // TODO: Si no existe usuario decir que el email se envio aunque en realidad no se haya hecho?
  if (!user) {
    return next(new AppError('No existe usuario con ese email.', 400));
  }

  // 2) Generate the random reset token
  const resetToken = await user.createPasswordResetToken();

  try {
    // 3) Send it to user email
    // const resetURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/v1/auth/resetPassword/${resetToken}`;

    // El reseteo se realiza en una pagina del front que proviene de una variable de entorno
    const resetURL = `${process.env.FRONT_RESET_URL}/${resetToken}`;

    await new Email(user, resetURL).sendResetPassword();

    res.status(200).json({
      status: 'success',
      message: `El token de reseteo se envio a tu email (${user.email})!. Caducara en 10 minutos.`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.$query().patch({
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return next(
      new AppError(
        'Hubo un error al enviar el email!. Por favor intenta mas tarde.',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 0) Password Validation
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Las contraseñas ingresadas no coinciden!', 400));
  }

  // 1) Get user based on the token de reseteo
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.query()
    .context({ getAllFields: true })
    .findOne({
      passwordResetToken: hashedToken,
    })
    .andWhere('passwordResetExpires', '>', new CustomDate().ISO())
    .withGraphFetched('address.city.province');

  if (!user) {
    return next(new AppError('Token invalido o ya expiro.', 400));
  }

  // 2) If token has not expired, and there is user, set the new password
  await user.$query().patch({
    password: req.body.password,
    passwordResetToken: null,
    passwordResetExpires: null,
  });

  // 3) Log the user in, send JWT
  const token = createSendToken(user, 200, res);

  // 4) Remove the password from the output
  user.password = undefined;
  user.passwordResetToken = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  // 0) Compare Passwords
  if (password !== passwordConfirm) {
    return next(new AppError('Los passwords ingresados no coinciden!', 400));
  }

  // 1) Get user from collection
  const user = await User.query()
    .findById(req.user.id)
    .context({ getAllFields: true })
    .withGraphFetched('address.city.province');

  // 2) Check if posted current password is correct
  if (!(await user.comparePassword(passwordCurrent))) {
    return next(new AppError('Invalid current password.', 400));
  }

  // 3) If so, update password
  await user.$query().patch({ password: password });

  // 4) Log user in, send JWT
  const token = createSendToken(user, 200, res);

  // 5) Remove the password from the output
  user.password = undefined;
  user.passwordResetToken = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});
/////////////////////////////////////////////////////////
// Middlewares
/////////////////////////////////////////////////////////
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token
  let token;
  if (
    req.headers.authorization && // Lee JWT desde Header
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; // Lee JWT desde Cookie
  }

  if (!token) {
    return next(
      new AppError(
        'No estas logueado!. Por favor logueate para obtener acceso.',
        401
      )
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const freshUser = await User.query().findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError('El usuario al que pertenece este token no existe mas!', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (
    freshUser.passwordChangedAt &&
    User.changesPasswordAfter(decoded.iat, freshUser.passwordChangedAt)
  ) {
    return next(
      new AppError(
        'El usuario ha cambiado la contraseña recientemente. Por favor logueese de nuevo.',
        403
      )
    );
  }

  // 5) Grant access to protected Route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have premission to perform this action.', 403)
      );
    }

    next();
  });
};
