const DataStore = require('./DataStore');
const path = require('path');

module.exports = function postHandler(req, res, next) {

  const dataStore = new DataStore(path.join(__dirname, '../notes'));

  res.statusCode = 200;
  dataStore.store(req.body)
    .then((id) => {
      res.send(`Stored note as ${id}`);
    })
    .catch((err) => {
      next(err);
    });

};