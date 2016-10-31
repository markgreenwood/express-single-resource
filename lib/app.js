// const http = require('http');
const getHandler = require('./GetHandler');
const getAllHandler = require('./GetAllHandler');
const postHandler = require('./PostHandler');
// const putHandler = require('./PutHandler');
// const deleteHandler = require('./DeleteHandler');
const express = require('express');
const app = express();

app.get('/:res_type/:res_id', getHandler);
app.get('/:res_type', getAllHandler);
app.post('/:res_type', postHandler);

module.exports = app;