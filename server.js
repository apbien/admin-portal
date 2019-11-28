'use strict';

//DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exhbs = require('express-handlebars');
// var hbshelper = require('handlebars');

//ROUTE DIRECTORIES -- ADD THE VARIABLES HERE
var index = require('./routes/index');
var login = require('./routes/Login');
var logout = require('./routes/logout');
var home = require('./routes/home');
var admin = require('./routes/admin');

var app = express();

//SET THE PATH TO VIEWS DIRECTORY AND VIEWING ENGINE
var hbs = exhbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


//USE OF DEPENDENCIES
app.use(favicon(__dirname + '/public/images/egg'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SESSION TRACKER
app.set('trust proxy', 1) 

app.use(session({
    key: 'user_id',
    secret: 'adminportal',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000}
}))

//MIDDLEWARE FUNCITONS
app.use((req, res, next) => {
    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');
    }
    next();
});

//MIDDLEWARE FOR ROUTERS
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use('/admin', admin);

//CATCH 404 - FORWARD TO ERROR HANDLERS
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//ERROR HANDLERS

//DEVELOPMENT ERROR HANDLER -- PRINTS STACKTRACE
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

//PRODUCTION ERROR HANDLER -- NO STACKTRACES LEAKED TO USER
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

//RUNS SERVER AND CONNECTS TO PORT
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});