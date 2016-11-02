const DataStore = require('./DataStore');
const path = require('path');

module.exports = function getHandler(req, res, next) {
  const dataStore = new DataStore(path.join(__dirname, '../notes'));

  dataStore.get(req.params.res_id)
    .then((data) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      if (err.code === 'ENOENT') next({code: 404, message: 'Not found'});
      else next(err);
    });
};