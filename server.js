var express     = require('express');
var app         = express();
var mongojs     = require('mongojs');
var db          = mongojs('bucketlist', ['bucketlist']);
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/bucketlist', function (req, res) {
  console.log('I received a GET request');

  db.bucketlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/bucketlist', function (req, res) {
  console.log(req.body);
  db.bucketlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/bucketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bucketlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/bucketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bucketlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/bucketlist/:id', function (req, res) {
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





app.listen(3000);
console.log("Server running on port 3000");
