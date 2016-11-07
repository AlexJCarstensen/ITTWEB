var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {



  res.render('index', { title: 'Workouts' });
});

router.post('/add', function(req, res, next)
{

console.log("TESTING");

res.render('index', { title: 'Workouts' });
});

module.exports = router;
