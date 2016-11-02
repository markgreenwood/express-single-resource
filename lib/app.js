const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.join(__dirname, '../public');
const resources = require('./routes/resources');
const errorHandler = require('./error-handler');

app.use(express.static(publicDir));

app.use('/api/notes', resources);

app.use((req, res, next) => { next({code: 400, message: 'Bad request'}); });

app.use(errorHandler);

module.exports = app;