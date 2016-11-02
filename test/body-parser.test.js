const expect = require('chai').expect;
const bodyParser = require('../lib/BodyParser');
const EventEmitter = require('events');

describe ('BodyParser middleware', () => {

  it ('parses body and calls next when done', (done) => {

    const req = new EventEmitter();
    const bodyData = { 'content': 'Here\'s the data' };

    const next = () => {
      expect(req.body).to.deep.equal(bodyData);
      done();
    };

    bodyParser(req, null, next);

    req.emit('data', JSON.stringify(bodyData));
    req.emit('end');

  });

});