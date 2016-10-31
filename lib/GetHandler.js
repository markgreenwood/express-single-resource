const DataStore = require('./DataStore');
const path = require('path');

module.exports = function getHandler(req, res) {
  const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));

  dataStore.get(req.params.res_id)
    .then((data) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.send(err.message);
      }
      else {
        res.statusCode = 500;
        res.send(err.message);
      }
    });
};