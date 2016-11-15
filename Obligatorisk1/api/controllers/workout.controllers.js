var mongoose = require('mongoose');
var Workout = mongoose.model('Workout');

module.exports.workoutsGetAll = function (req, res) {
    console.log("Get all workouts");

    Workout
        .find()
        .exec(function (err, workouts) {
            var response = {
                status: 200,
                message: workouts
            };
            if (err) {
                console.log("Error finding workouts");
                response.status = 500;
                response.message = err;
            }

            console.log("Found " + workouts.length + " workouts");
            res
                .status(response.status)
                .json(response.message)

        });
};

module.exports.workoutsGetOne = function (req, res) {
    var workoutId = req.params.workoutId;
    console.log('Get workoutId', workoutId);

    Workout
        .findById(workoutId)
        .exec(function (err, workout) {
            var response = {
                status: 200,
                message: workout
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
}

module.exports.workoutsAddOne = function (req, res) {

    Workout
        .create({
            name: req.body.name,
        }, function (err, workout) {
            if (err) {
                console.log("Error creating workout");
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("workout created", workout)
                res
                    .status(201)
                    .json(workout);
            }
        }
        );
};

module.exports.workoutsUpdateOne = function (req, res) {

    var workoutId = req.params.workoutId;
    console.log('PUT workoutId', workoutId);

    Workout
        .findById(workoutId)
        .select("-exercises")
        .exec(function (err, workout) {
            var response = {
                status: 200,
                message: workout
            };
            if (err) {
                console.log("Error finding workout");
                response.status = 500;
                response.message = err;
            } else if (!workout) {
                response.status = 404;
                response.message = {
                    "message": "Workout ID not found"
                };
            } if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            }
            else {
                workout.name = req.body.name;
            }

            workout.save(function (err, workoutUpdated) {
                if (err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json();
                }
            })

        });
}

module.exports.workoutsDeleteOne = function (req, res) {
    var workoutId = req.params.workoutId;
    console.log('DELETE workoutId', workoutId);

    Workout
        .findByIdAndRemove(workoutId)
        .exec(function (err, workout) {

            if (err) {
                res
                    .status(404)
                    .json(err);
            }
            else {
                console.log("Workout deleted, id:", workout);
                res
                    .status(204)
                    .json();
            }
        });
};

