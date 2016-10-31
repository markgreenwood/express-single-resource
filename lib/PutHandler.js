const DataStore = require('./DataStore');
const bodyParser = require('./BodyParser');
const path = require('path');

module.exports = function postHandler(req, res) {
  
  const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));

  bodyParser(req, (err, objdata) => {
    if (err) {
      res.statusCode = 400;
      res.send(err.message);
    }
    else if (objdata.hasOwnProperty('id')) {
      res.statusCode = 400;
      res.send('Request to update data should not contain "id" in the passed-in data');
    }
    else {
      res.statusCode = 200;
      if (req.params.res_id) {
        dataStore.get(req.params.res_id)
          .then((obj) => {
            for (let key in objdata) {
              obj[key] = objdata[key];
            }
            dataStore.store(obj)
              .then(() => {
                res.send(`Stored note as ${req.params.res_id}`);
              })
              .catch((err) => {
                res.statusCode = 500;
                res.send(err.message);
              });
          })
          .catch((err) => {
            res.statusCode = 500;
            res.send(err.message);
          });
      }
    }
  });

};