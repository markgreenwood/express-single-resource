const DataStore = require('./DataStore');
const bodyParser = require('./BodyParser');
const path = require('path');
const parseUrl = require('url').parse;

module.exports = function postHandler(req, resp) {
  const url = parseUrl(req.url, true);
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];

  if (res_id) updateNote(res_type, res_id, req, resp);
};

function updateNote(res_type, res_id, req, resp) {

  const dataStore = new DataStore(path.join(__dirname, `../${res_type}`));

  bodyParser(req, (err, objdata) => {
    if (err) {
      resp.statusCode = 400;
      resp.end(err.message);
    }
    else if (objdata.hasOwnProperty('id')) {
      resp.statusCode = 400;
      resp.end('Request to update data should not contain "id" in the passed-in data');
    }
    else {
      resp.statusCode = 200;
      if (res_id) {
        dataStore.get(res_id)
          .then((obj) => {
            for (let key in objdata) {
              obj[key] = objdata[key];
            }
            dataStore.store(obj)
              .then(() => {
                resp.write(`Stored note as ${res_id}`);
                resp.end();
              })
              .catch((err) => {
                resp.statusCode = 500;
                resp.end(err.message);
              });
          })
          .catch((err) => {
            resp.statusCode = 500;
            resp.end(err.message);
          });
      }
    }
  });
}