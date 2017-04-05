var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

// defines the used database and collection
var db = mongojs('filmlist', ['filmlist']);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/filmlist/', function(req, res){
  console.log("received GET")
  
  db.filmlist.find(function(err, docs){
    res.json(docs);
  });

});

app.post('/filmlist/', function(req,res){
  console.log("post success"); 
  db.filmlist.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

app.delete('/filmlist/:id', function(req, res){
  var id = req.params.id;
  db.filmlist.remove({_id: mongojs.ObjectID(id)}, function(err, doc){
    res.json(doc);
  });
});

app.get('/filmlist/:id', function(req, res){
  var id = req.params.id;
  db.filmlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.put('/filmlist/:id', function (req, res) {
  var id = req.params.id;
  db.filmlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, year: req.body.year, genre: req.body.genre}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

var port = 3000;
app.listen(port);
console.log("Server running on port " + port);