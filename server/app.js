//Imports
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
//const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const passport = require('passport');
require('./utils/passport')(passport);

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const routes = require('./routes');
const { all } = require('./routes');

const app = express();

if (process.NODE_ENV === 'production') app.enable('trust proxy');

/**
 *  Common Middlewares
 */

app.use((req, res, next) => {
  console.log(
    req.url,
    /^(\/api).*(?<!(facebook|google))(?<!callback)$/.test(req.url)
  );
  next();
});

// Implement CORS
if (process.env.NODE_ENV === 'production') {
  const whitelist = [process.env.CLIENT_URL, process.env.ADMIN_URL];
  // Revisa las rutas api/ que no terminen en callback (las de facebook y google)
  app.use(
    /^(\/api).*(?<!(facebook|google))(?<!callback)$/,
    cors({
      credentials: true,
      origin: function (origin, callback) {
        console.log(origin, whitelist.indexOf(origin));
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );
} else {
  // Si esta en dev, todos los origenes son validos
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        callback(null, true);
      },
    })
  );

  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: function (origin, callback) {
  //       if (origin == undefined) {
  //         callback(null, true);
  //       } else if (
  //         /http:\/\/((192\.168\.0\.\d+)|(localhost)):\d\d\d\d/g.test(origin)
  //       ) {
  //         callback(null, true);
  //       } else {
  //         callback(new Error('Not allowed by CORS'));
  //       }
  //     },
  //   })
  // );
}

// Set Security HTTP Headers
app.use(helmet());

// Development Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limita a X request por hora
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Parsers
app.use(express.json({ limit: '50kb' })); // Body parser, reading data from body into rq.body

app.use(cookieParser()); // Cookie parser

// Data sanitization gainst XSS
app.use(xss());

// Prevent HTTP Parameter Polution (Saca parametros repetidos exeptos los de la whitelist) TODO: VER MEJOR FORMA
// app.use(
//   hpp({
//     whitelist: [],
//   })
// );

// Passport Config
app.use(passport.initialize());

/**
 *  App Configuration
 */

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Compression
app.use(compression());

// Routes
app.use(routes);

// 404
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});
// GlobalErrorMiddleware
app.use(globalErrorHandler);

//Export
module.exports = app;
