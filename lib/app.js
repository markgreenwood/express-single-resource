// const http = require('http');
const getHandler = require('./GetHandler');
const getAllHandler = require('./GetAllHandler');
const postHandler = require('./PostHandler');
const putHandler = require('./PutHandler');
const deleteHandler = require('./DeleteHandler');
const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.get('/:res_type/:res_id', getHandler);
app.get('/:res_type', getAllHandler);
app.post('/:res_type', postHandler);
app.put('/:res_type/:res_id', putHandler);
app.delete('/:res_type/:res_id', deleteHandler);
app.use(function errorHandler (req, res) {
  console.log('Catch-all error handler encountered');
  res.status(400).send('Bad request. Consult the API documentation.');
});

module.exports = app;