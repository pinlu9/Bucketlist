var express     = require('express');
var server         = express();
var mongojs     = require('mongojs');
var db          = mongojs('bucketlist', ['bucketlist']);
var bodyParser  = require('body-parser');

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());

server.get('/bucketlist', function (req, res) {
  console.log('I received a GET request');

  db.bucketlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

server.post('/bucketlist', function (req, res) {
  console.log(req.body);
  db.bucketlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

server.delete('/bucketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bucketlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

server.get('/bucketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bucketlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

server.put('/bucketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.list);
  db.bucketlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {list: req.body.list}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

server.listen(process.env.PORT || 3000);
