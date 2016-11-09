var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

/* GET home page. */
router.get('/', function(req, res, next) {


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

findDocuments(db, function(result){
  res.render('index', { title: 'Workouts', mytable:  result });
   
   db.close();
});
});

});

/* Put new Workout in database */
router.post('/add', function(req, res, next)
{
  console.log(req.body);
console.log("POST");
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

//Inserting into documents
insertDocuments(db, function(){
   db.close();
},req); 
});


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

findDocuments(db, function(result){
  res.render('index', { title: 'Workouts', mytable:  result });
   db.close();
});
});



 

});

/* Insert function */ 
var insertDocuments = function(db, callback, req){

console.log("Posting to database");


          
db.collection('Workouts').insertOne(req.body,  function(err, result)
{
  assert.equal(err, null);
  console.log("Inserted the following records");
  callback();
});


      //  }



}


/*Read Function */
var findDocuments = function(db, callback) {
// Get the documents collection
var collection = db.collection('Workouts').find( );
// Find all documents
collection.each(function(err, docs) {
assert.equal(err, null);
if(docs != null)
{
  console.log("Found the following records");
  console.dir(docs);
}
else
{
  callback(docs);
}
});
}

var removeDocuments = function(db, callback) {
// Get the documents collection
var collection = db.collection('Workouts').deleteMany(
      { "test" : "Hello"}, function(err, results){
        callback();
      }
)


}

module.exports = router;
