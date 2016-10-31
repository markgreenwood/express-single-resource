const DataStore = require('./DataStore');
const bodyParser = require('./BodyParser');
const path = require('path');

module.exports = function postHandler(req, res) {

  const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));

  bodyParser(req, (err, obj) => {
    if (err) {
      res.statusCode = 400;
      res.send(err.message);
    }
    else {
      res.statusCode = 200;
      dataStore.store(obj)
        .then((id) => {
          res.send(`Stored note as ${id}`);
        })
        .catch((err) => {
          res.statusCode = 500;
          res.send(err.message);
        });
    }
  });

};