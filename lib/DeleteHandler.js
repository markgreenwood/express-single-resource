const DataStore = require('./DataStore');
const path = require('path');


module.exports = function deleteHandler(req, resp) {

  const dataStore = new DataStore(path.join(__dirname, `../${req.params.res_type}`));

  console.log(`Delete request received for /${req.params.res_type}/${req.params.res_id}`);

  dataStore.remove(req.params.res_id)
    .then((msg) => {
      resp.statusCode = 200;
      resp.send(msg);
    })
    .catch((err) => {
      resp.statusCode = 500;
      resp.send(err.message);
    });

};