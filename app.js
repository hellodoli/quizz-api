const express = require('express');
const cors = require('cors');

const app = express();

// 1. Global Middleware
// Set security HTTP header
app.use(cors());
app.options('*', cors());
app.use(express.json());

// 2. Routes
const apiVersion = '/api/v1';
const quizzRouter = require('./routers/quizzRouter');
//const apiKeyRouter = require('./routers/apiKeyRouter');

app.use(`${apiVersion}/quizzs`, quizzRouter);
//app.use(`${apiVersion}/keyGenerate`, apiKeyRouter);

module.exports = app;
