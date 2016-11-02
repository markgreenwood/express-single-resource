// Marty's body parser from 10/26/2016 class, modified for Express on 11/1/2016
module.exports = function bodyParser(req, res, next) {

  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    req.body = JSON.parse(body);
    next();
  });

};