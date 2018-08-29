'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require("uuid");
var AWS = require("aws-sdk");
var fs = require('fs');

//var routes = require('./public/views/index.html');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.all('/', (req, res) => {
    //console.log(typeof req.body.Vin + ' Here');
    console.log(req.body);
    if (req.body.Vin) {
        if (req.body.Check) {
            handleSearch(req);
        }
        //console.log(req.body.Vin);
        else {
            handleUpdate(req);
        }
    }
    res.render('index', {
        title: 'Justin',
        Vin: ''
    }); });

app.post('/', function (req, res) {

    console.log(req.body.Vin);
});
/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

function handleUpdate(req) {
    AWS.config.update({
        region: "us-east-2"
    });
    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Mileage";
    var vin = req.body.Vin;
    var mileage = parseInt(req.body.Mileage);
    var car = "Evo";
    var color = "White";
    console.log(vin);
    console.log(mileage);
    var params = {
        TableName: table,
        Item: {
            "id": uuid.v1(),
            "Vin": vin,
            "Mileage": mileage,
            "Color": color,
            "Car": car
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var stuff = JSON.stringify(data);
            console.log(data);
            console.log(stuff.Item);


        }
    });
}

function handleSearch(req) {
    AWS.config.update({
        region: "us-east-2"
    });
    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Mileage";
    var vin = req.body.Vin;
    var car = "GTR";
    var color = "Silver";
    // console.log(vin);
    var params = {
        TableName: table,
        FilterExpression: 'Vin = :thisvin',
        ExpressionAttributeValues: {
            ":thisvin": vin
        }
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var stuff = JSON.stringify(data);
            console.log(data.Items.length);
            for (var x = 0; x < data.Items.length; x++) {
                console.log(JSON.stringify(data.Items[x]));
            }
        }
    });

}
