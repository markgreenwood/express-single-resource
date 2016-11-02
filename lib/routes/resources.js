const getHandler = require('../GetHandler');
const getAllHandler = require('../GetAllHandler');
const postHandler = require('../PostHandler');
const putHandler = require('../PutHandler');
const deleteHandler = require('../DeleteHandler');
const bodyParser = require('../BodyParser');
const express = require('express');
const router = express.Router();

router
  .get('/', getAllHandler)
  .get('/:res_id', getHandler)
  .post('/', bodyParser, postHandler)
  .put('/:res_id', bodyParser, putHandler)
  .delete('/:res_id', deleteHandler);

module.exports = router;