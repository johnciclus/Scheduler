var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Notes', function() {
  it('should list ALL Notes on /api/notes GET', function(done) {
    chai.request(server)
      .get('/api/notes')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
  it('should list a SINGLE note on /api/note/<id> GET', function(done){
    var Note = server.models.Note;
    var note = new Note({'title': 'Title 1', 'comment': 'Comment 1'});
    note.save();
    done();
  });
  it('should add a SINGLE note on /api/notes POST', function(done){
    chai.request(server)
      .post('/api/notes')
      .send({'title': 'Note 1', 'content': 'Content 1'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        done();
      });
  });
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});
