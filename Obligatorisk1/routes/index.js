var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

/* GET home page. */
router.get('/', function(req, res, next) {



  res.render('index', { title: 'Workouts' });
});

/* Put new Workout in database */
router.post('/add', function(req, res, next)
{

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

//Inserting into documents
insertDocuments(db, function(){
   db.close();
}); 
});


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

findDocuments(db, function(){
   db.close();
});
});



 res.render('index', { title: 'Workouts' });

});

/* Insert function */ 
var insertDocuments = function(db, callback){

console.log("Posting to database");

//Getting table of exercises
 var table = res.document.getElementById("newWorkoutTable");
 var rows = table.rows.length;

        for (var r = 0, rows; r < n; r++) {
          var exercise = new Object();
          exercise.name = table.rows[r].cell[0].innerHTML;
          exercise.Description = table.rows[r].cell[1].innerHTML;
          exercise.Sets = table.rows[r].cell[2].innerHTML;
          exercise.Repetitions = table.rows[r].cell[3].innerHTML;
          
          db.collection('Workouts').insertOne(exercise.toJSON(),  function(err, result)
{
  assert.equal(err, null);
  console.log("Inserted the following records");
  callback();
});


        }



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
  console.log("No documents in database");
  callback();
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
