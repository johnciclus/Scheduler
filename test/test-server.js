var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();

chai.use(chaiHttp);

describe('Tasks', function() {
  it('should list ALL Tasks on /api/tasks GET', function(done) {
    chai.request(server)
      .get('/api/tasks')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.be.length(0);
        done();
      });
  });
  it('should list a SINGLE task on /api/tasks/<id> GET', function(done){
    var Task = server.models.Task;
    var task = {'name': 'Task 1', 'duration': 1};
    Task.create(task, function(err, obj) {
      chai.request(server)
        .get('/api/tasks/' + obj.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('duration');
          res.body.name.should.equal('Task 1');
          res.body.duration.should.equal(1);
          done();
        });
    });
  });
  it('should add a SINGLE task on /api/tasks POST', function(done){
    chai.request(server)
      .post('/api/tasks')
      .send({'name': 'Task 1', 'duration': 1})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('duration');
        done();
      });
  });
  it('should update a SINGLE task on /api/tasks/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/tasks')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/tasks/'+res.body[0].id)
          .send({'name': 'Task 1', 'duration': 2, 'id': 1})
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            done();
          });
      });
  });
  it('should delete a SINGLE task on /api/tasks/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/tasks')
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/tasks/'+res.body[0].id)
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

describe('Technicians', function() {
  it('should list ALL Technicians on /api/technicians GET', function(done) {
    chai.request(server)
      .get('/api/technicians')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.be.length(0);
        done();
      });
  });
  it('should list a SINGLE technician on /api/technicians/<id> GET', function(done) {
    var Technician = server.models.Technician;
    var technician = {'name': 'Technician 1', 'initial_time': 8, 'final_time': 18};
    Technician.create(technician, function(err, obj) {
     chai.request(server)
     .get('/api/technicians/' + obj.id)
     .end(function(err, res) {
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.be.a('object');
       res.body.should.have.property('id');
       res.body.should.have.property('name');
       res.body.name.should.equal('Technician 1');
       res.body.initial_time.should.equal(8);
       res.body.final_time.should.equal(18);
       done();
     });
   });
  });
  it('should add a SINGLE technician on /api/technicians POST', function(done) {
    chai.request(server)
      .post('/api/technicians')
      .send({'name': 'Technician 1', 'initial_time': 8, 'final_time': 18})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('initial_time');
        res.body.should.have.property('final_time');
        done();
      });
  });
  it('should update a SINGLE technician on /api/technicians/<id> PUT', function(done) {
   chai.request(server)
   .get('/api/technicians')
   .end(function(err, res) {
   chai.request(server)
   .put('/api/technicians/'+res.body[0].id)
   .send({'name': 'Technician 1', 'initial_time': 8, 'final_time': 18, 'id': 1})
   .end(function(err, res) {
   res.should.have.status(200);
   res.should.be.json;
   res.body.should.be.a('object');
   res.body.should.have.property('id');
   res.body.should.have.property('name');
   done();
   });
   });
   });
  it('should delete a SINGLE task on /api/tasks/<id> DELETE', function(done) {
    chai.request(server)
      .get('/api/tasks')
      .end(function (err, res) {
        chai.request(server)
          .delete('/api/tasks/' + res.body[0].id)
          .end(function (err, res) {
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
