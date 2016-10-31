const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, err => {
  if (err) console.log('ERROR! ', err);
  else console.log('server listening on port ' + server.address().port);
});