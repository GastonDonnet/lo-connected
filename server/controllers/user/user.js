const User = require('../../models/User');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES

////////////// HANDLERS
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Esta ruta no es para actualizar la contraseña. Utilice /updateMyPassword',
        400
      )
    );
  }

  // 2) Filter the data that send the user
  const filteredBody = filterObj(
    req.body,
    'displayName',
    'birthDate',
    'gender'
  );

  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // 3) Update user document
  const updatedUser = await User.query().patchAndFetchById(
    req.user.id,
    filteredBody
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  User.query().patchAndFetchById(req.user.id, {
    isActive: false,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User, 'address.city.province');
exports.updateUser = factory.updateOne(User); //Do not use for password
exports.deleteUser = factory.deleteOne(User);
