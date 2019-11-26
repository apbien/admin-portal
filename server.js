'use strict';

//DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('express-handlebars');

//ROUTE DIRECTORIES -- ADD THE VARIABLES HERE
var index = require('./routes/index');
var login = require('./routes/Login');
var logout = require('./routes/logout');
var home = require('./routes/home');

var app = express();

//SET VIEWS TO THE VIEWS DIRECTORY
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname+'/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
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
    key: 'login_id',
    secret: 'adminportal',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000}
}))

//MIDDLEWARE FUNCITONS
app.use((req, res, next) => {
    if (req.cookies.login_id && !req.session.user) {
        res.clearCookie('login_id');
    }
    next();
});

//MIDDLEWARE FOR ROUTERS
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);

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