// Marty's body parser from 10/26/2016 class
module.exports = function bodyParser(req, cb) {

  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    try {
      cb(null, JSON.parse(body));
    }
    catch (err) {
      cb(err);
    }
  });
};