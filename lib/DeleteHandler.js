const DataStore = require('./DataStore');
const path = require('path');
const parseUrl = require('url').parse;


module.exports = function deleteHandler(req, resp) {
  const url = parseUrl(req.url, true);
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];

  if (res_type && res_id) deleteNote(res_type, res_id, resp);
  else {
    resp.statusCode = 400;
    resp.end('Need res_type and res_id in URL');
  }
};

function deleteNote(res_type, res_id, resp) {

  const dataStore = new DataStore(path.join(__dirname, `../${res_type}`));

  dataStore.remove(res_id)
    .then((msg) => {
      resp.statusCode = 200;
      resp.write(msg);
      resp.end();
    })
    .catch((err) => {
      resp.statusCode = 500;
      resp.end(err.message);
    });
}