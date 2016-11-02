const DataStore = require('./DataStore');
const path = require('path');

module.exports = function getAllHandler(req, res, next) {

  // const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));
  const dataStore = new DataStore(path.join(__dirname, '../notes'));
  
  dataStore.getAll()
    .then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      next(err);
    });
  
};