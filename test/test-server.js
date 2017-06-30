var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Notes', function() {
  it('should list ALL Notes on /api/notes GET', function(done) {
    chai.request(server)
      .get('/api/notes')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.be.length(0);
        done();
      });
  });
  it('should list a SINGLE note on /api/notes/<id> GET', function(done){
    var Note = server.models.Note;
    var note = {'title': 'Title 1', 'comment': 'Comment 1'};
    Note.create(note, function(err, obj) {
      chai.request(server)
        .get('/api/notes/' + obj.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title');
          res.body.should.have.property('comment');
          res.body.title.should.equal('Title 1');
          res.body.comment.should.equal('Comment 1');
          done();
        });
    });
  });
  it('should add a SINGLE note on /api/notes POST', function(done){
    chai.request(server)
      .post('/api/notes')
      .send({'title': 'Note 1', 'content': 'Content 1'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        done();
      });
  });
  it('should update a SINGLE note on /api/notes/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/notes')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/notes/'+res.body[0].id)
          .send({'title': 'Title X', 'id': 1})
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('title');
            done();
          });
      });
  });
  it('should delete a SINGLE note on /api/notes/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/notes')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/notes/'+res.body[0].id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('count');
            res.body.count.should.equal(1);
            done();
          });
      });
  });
});
