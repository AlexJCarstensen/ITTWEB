var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

var renderHomepage = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No workouts found";
        }
    }
    var renderObject = {
        title: 'Workouts',
        workouts: responseBody,
        message: message
    }
    res.render('workout-list', renderObject);
};



/* GET 'home' page */
var renderLoginpage = function (req, res)
{
    res.render('login');
}
module.exports.login = function(req, res){
    renderLoginpage(req, res);
}

var renderRegisterpage = function (req, res)
{
    res.render('register');
}
module.exports.register = function(req, res){
    renderRegisterpage(req, res);
}

module.exports.doRegister = function(req, res){
    var requestOptions, path;

    //Check is this path is correct
    path = '/api/register';
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;

            renderHomepage(req, res, data);
        }
    );
}

module.exports.homelist = function (req, res) {
    var requestOptions, path;

    //Check is this path is correct
    path = '/api/workouts';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;

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
                _showError(req, res, response.statusCode);
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
        name : req.body.name,        
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postdata
    };
    if (!postdata.name) {
        res.redirect('?err=val');
    } else {
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/');
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    res.redirect('/?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
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
        name : req.body.name,
        description : req.body.name,
        repetitions : parseInt(req.body.repetitions, 10),
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
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
}