const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const sander = require('sander');
const test_server = require('../lib/app');
const DataStore = require('../lib/DataStore');
chai.use(chaiHttp);

const testNotes = [
  { id: 'testfile1', noteBody: 'Test file 1.' },
  { id: 'testfile2', noteBody: 'Test file 2.' },
  { id: 'testfile3', noteBody: 'Test file 3.' },
  { id: 'testfile4', noteBody: 'Hello, world!' }
];

describe ('Server integration tests', function() {

  let notesDir;
  let dataStore;
  let request = chai.request(test_server);

  before((done) => {
    notesDir = path.join(__dirname, '../notes');
    if (!sander.existsSync(notesDir)) {
      sander.mkdirSync(notesDir);
    }

    dataStore = new DataStore(notesDir);

    Promise.all([
      dataStore.store(testNotes[0]),
      dataStore.store(testNotes[1]),
      dataStore.store(testNotes[2])
    ])
    .then(() => {
      done();
    });
  });

  describe ('HTTP GET', () => {

    it ('"/api/notes" returns all notes', (done) => {
      request
        .get('/api/notes')
        .end((err, res) => {
          expect(res.body).to.deep.equal(testNotes.slice(0,3));
          done(err);
        });
    });

    it ('"/api/notes/:resourcename" returns that resource (note)', (done) => {
      request
        .get('/api/notes/testfile1')
        .end((err, res) => {
          expect(res.body).to.deep.equal(testNotes[0]);
          done(err);
        });
    });

    it ('"/api/invalidpath" returns a 400 error', (done) => {
      request
        .get('/api/invalidpath')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    // Dumping this test because / should eventually return our home page
    // it ('no resource type returns a 400 error', (done) => {
    //   request
    //     .get('')
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       done();
    //     });
    // });

  });

  describe ('HTTP POST', () => {

    it (`"/api/notes" with ${JSON.stringify(testNotes[3])} stores that content in the store`, (done) => {
      request
        .post('/api/notes')
        .send(testNotes[3])
        .end((err) => {
          if (err) done(err);
          request
            .get(`/api/notes/${testNotes[3].id}`)
            .end((err, res) => {
              expect(res.body).to.deep.equal(testNotes[3]);
              done(err);
            });
        });
    });

  });

  describe ('HTTP PUT', () => {

    it ('"/api/notes/:resourcename" with { noteBody: "This is new content." } stores that content in resourcename', (done) => {
      request
        .put(`/api/notes/${testNotes[2].id}`)
        .send({ noteBody: 'This is new content.' })
        .end((err, res) => {
          if (err) done(err);
          expect(res.text).to.equal(`Stored note as ${testNotes[2].id}`);
          request
            .get(`/api/notes/${testNotes[2].id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.deep.equal({ id: 'testfile3', noteBody: 'This is new content.' });
              done();
            });
        });
    });

    it ('request to update an object where update data contains "id" should generate an error', (done) => {
      request
        .put(`/api/notes/${testNotes[2].id}`)
        .send({ id: 'bogusid', noteBody: 'This is bad content.' })
        .end((err, res) => {
          // if (err) done(err);
          expect(res).to.have.status(400);
          request
            .get(`/api/notes/${testNotes[2].id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.deep.equal({ id: 'testfile3', noteBody: 'This is new content.' });
              done();
            });
        });
    });

  });

  describe ('HTTP DELETE', () => {

    it ('"/api/notes/:resourcename" removes resourcename from the store', (done) => {
      request
        .del(`/api/notes/${testNotes[3].id}`)
        .end((err, res) => {
          expect(res.text).to.equal(`Deleted note ${testNotes[3].id}`);
          done(err);
        });
    });

    it ('removed resource is really gone', (done) => {
      request
        .get('/api/notes/testfile4')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it ('called with no res_id returns error', (done) => {
      request
        .del('/api/notes')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  after ((done) => {
    sander.rimraf(notesDir)
      .then(done);
  });
});