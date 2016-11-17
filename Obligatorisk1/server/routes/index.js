var express = require('express');
var router = express.Router();

var ctrlWorkouts = require('../controllers/workouts');

//Workout pages
router.get('/', ctrlWorkouts.login)
router.post('/login', ctrlWorkouts.doLogin)
router.get('/register', ctrlWorkouts.register)
router.post('/register', ctrlWorkouts.doRegister )
router.post('/workouts', ctrlWorkouts.addWorkout)
router.get('/workouts/:workoutid', ctrlWorkouts.workoutInfo);
router.post('/workouts/:workoutid/exercises', ctrlWorkouts.addExercise);

router.post

module.exports = router;