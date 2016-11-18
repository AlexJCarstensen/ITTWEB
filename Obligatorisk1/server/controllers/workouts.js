var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};

var _showError = function (req, res, status, errMessage) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = errMessage;
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

var renderHomepage = function (req, res, responseBody) {
    var message;
    if (!(responseBody.workouts instanceof Array)) {
        message = "No workouts found";
        responseBody = [];
    } else {
        if (!responseBody.workouts.length) {
            message = "No workouts found";
        }
    }
    var renderObject = {
        title: 'Workouts',
        workouts: responseBody.workouts,
        message: message,
        user : responseBody.user
    }
    res.render('workout-list', renderObject);
};



/* GET 'home' page */
var renderLoginpage = function (req, res) {
    res.render('login');
}
module.exports.login = function (req, res) {
    renderLoginpage(req, res);
}
module.exports.doLogin = function (req, res) {
    var requestOptions, path, loginData;
    loginData = {
        email: req.body.email,
        password: req.body.password
    }
    //Check is this path is correct
    path = '/api/login';
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: loginData
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;

            if (response.statusCode === 200) {

                getWorkouts(req, res);
            } else {
               
                var errMessage = body.message;
               
                _showError(req, res, response.statusCode, errMessage);
            }
        }
    );
}
var renderRegisterpage = function (req, res) {
    res.render('register');
}
module.exports.register = function (req, res) {
    renderRegisterpage(req, res);
}

module.exports.doRegister = function (req, res) {
    var requestOptions, path, signupData;
    signupData = {
        email: req.body.email,
        name : req.body.name,
        password: req.body.password
    }
    //Check is this path is correct
    path = '/api/register';
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: signupData
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;

            res.render('login');
        }
    );
}

var getWorkouts = function (req, res) {
    var user;

    user = {
        email: req.body.email
    };

    getWorkoutsFromApi(req, res, user);
    
};

var getWorkoutsFromApi = function(req, res, user) {
var requestOptions, path

//Check is this path is correct
    path = '/api/workouts';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: user
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = {
                workouts : body,
                user : user
            };

            renderHomepage(req, res, data);
        }
    );

};

var getworkoutInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/workouts/" + req.params.workoutid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                callback(req, res, data);
            } else {
                errMessage = "Coudn't fetch workout and exercises";
                _showError(req, res, response.statusCode, errMessage);
            }
        }
    );
};

var renderWorkoutPage = function (req, res, workoutDetail) {
    var message;
    if (!(workoutDetail.exercises instanceof Array)) {
        message = "API lookup error";
        workoutDetail.exercises = [];
    } else {
        if (!workoutDetail.exercises.length) {
            message = "No exercises found";
        }
    }
    var renderObject = {
        title: workoutDetail.name,
        workout: workoutDetail,
        message: message
    }
    res.render('workout-info', renderObject)
};
module.exports.workoutInfo = function (req, res) {
    getworkoutInfo(req, res, function (req, res, responseData) {
        renderWorkoutPage(req, res, responseData);
    });
};
module.exports.addWorkout = function (req, res) {
    var requestOptions, path, workoutid, postdata;
    path = "/api/workouts/";
    postdata = {
        name: req.body.name,
        userEmail: req.params.userEmail

    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.name) {
        res.redirect('?/login/err=val');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    var user = {
                         email: req.params.userEmail
                            };
                    getWorkoutsFromApi(req, res, user);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/login/?err=val');
                } else {
                    console.log(body);
                    var errMessage = "Failure in adding workout";
                    _showError(req, res, response.statusCode, errMessage);
                }
            }
        );
    }
}
module.exports.addExercise = function (req, res) {
    var requestOptions, path, workoutid, postdata;
    workoutid = req.params.workoutid;
    path = "/api/workouts/" + workoutid + '/exercises';
    postdata = {
        name: req.body.name,
        description: req.body.name,
        repetitions: parseInt(req.body.repetitions, 10),
        sets: parseInt(req.body.sets, 10)
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.name || !postdata.description || !postdata.repetitions || !postdata.sets) {
        res.redirect('/workouts/' + workoutid + '/exercises?err=val');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/workouts/' + workoutid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/workouts/' + workoutid + '/exercises?err=val');
                } else {
                    console.log(body);
                    var errMessage = "Faliure in adding exercise";
                    _showError(req, res, response.statusCode, errMessage);
                }
            }
        );
    }
}