const DataStore = require('./DataStore');
const path = require('path');

module.exports = function postHandler(req, res, next) {
  
  const dataStore = new DataStore(path.join(__dirname, '../notes'));

  if (req.body.hasOwnProperty('id')) {
    next({code: 400, message: 'Request to update data should not contain "id" in the passed-in data'});
  }
  else {
    res.statusCode = 200;
    if (req.params.res_id) {
      dataStore.get(req.params.res_id)
        .then((obj) => {
          for (let key in req.body) {
            obj[key] = req.body[key];
          }
          dataStore.store(obj)
            .then(() => {
              res.send(`Stored note as ${req.params.res_id}`);
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    }
    else {
      next({code: 400, message: 'Bad request'});
    }
  }

};