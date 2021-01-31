const express = require('express');
const passport = require('passport');
const catchAsync = require('../../utils/catchAsync');
const { signinWithOAUTH } = require('../../controllers/user/auth');
const authController = require('../../controllers/user/auth');

const router = express.Router();

// Auth x OAUTH

// Sete cookie para redireccion
const setRedirect = (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production')
    cookieOptions.domain = `.${process.env.DOMAIN_URL}`;

  res.cookie('redirectTo', req.headers.referer, cookieOptions);

  next();
};

// Rutas de autentificacion
router.get(
  '/google',
  setRedirect,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/facebook',
  setRedirect,
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
    session: false,
  })
);

// Callbacks
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (error, user) => {
    req.user = user;
    signinWithOAUTH(req, res, next);
  })(req, res, next);
});

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', { session: false }, (error, user) => {
    req.user = user;
    signinWithOAUTH(req, res, next);
  })(req, res, next);
});

// Auth x password
router.post('/signup', authController.signupWithPassword);
router.post('/signin', authController.signinWithPassword);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
