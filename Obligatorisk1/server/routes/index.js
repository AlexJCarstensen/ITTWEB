var express = require('express');
var router = express.Router();

var ctrlWorkouts = require('../controllers/workouts');

//Workout pages

router.get('/', ctrlWorkouts)