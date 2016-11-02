const DataStore = require('./DataStore');
const path = require('path');


module.exports = function deleteHandler(req, resp, next) {

  const dataStore = new DataStore(path.join(__dirname, '../notes'));

  if (!req.params.res_id) {
    resp.status(400);
    next({ code: 400, error: 'Bad request' });
  }
  else {
    dataStore.remove(req.params.res_id)
      .then((msg) => {
        resp.statusCode = 200;
        resp.send(msg);
      })
      .catch(() => {
        next({ code: 400, error: 'Bad request' });
      });
  }

};