const DataStore = require('./DataStore');
const path = require('path');

module.exports = function getAllHandler(req, res) {

  const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));
  
  if (!req.params.res_type) {
    res.statusCode = 400;
    res.send('Need to specify resource type');
  }
  dataStore.getAll()
    .then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      res.statusCode = 404;
      res.send(err.message);
    });
  
};