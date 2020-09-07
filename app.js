const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const app = express();
app.enable('trust proxy');

// 1. Global Middleware
// Set security HTTP header
app.use(cors());
app.options('*', cors());

app.use(helmet());

// Development logging

// Limit request
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameters pollution

app.use(compression());

app.use((req, res, next) => {
  next();
});

// 2. Routes
const apiVersion = '/api/v1';
const quizzRouter = require('./routers/quizzRouter');
//const apiKeyRouter = require('./routers/apiKeyRouter');

app.use(`${apiVersion}/quizzs`, quizzRouter);
//app.use(`${apiVersion}/keyGenerate`, apiKeyRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
