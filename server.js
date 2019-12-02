'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var exhbs = require('express-handlebars');

var index = require('./routes/index');
var login = require('./routes/Login');
var logout = require('./routes/logout');
var home = require('./routes/home');
var admin = require('./routes/admin');
var hrAdmin = require('./routes/adminroles/hr');
var financeAdmin = require('./routes/adminroles/finance');
var salesAdmin = require('./routes/adminroles/sales');
var enggAdmin = require('./routes/adminroles/engineering');

var app = express();

var hbs = exhbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    helpers: require('./views/helpers/handlebars'),
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/public/images/egg'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1);
app.use(session({
    key: 'user_id',
    secret: 'adminportal',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 }
}));

app.use((req, res, next) => {
    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');
    }
    next();
});

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);
app.use('/admin', admin);
app.use('/hr', hrAdmin);
app.use('/finance', financeAdmin);
app.use('/sales', salesAdmin);
app.use('/engineer', enggAdmin);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.redirect('/login');
        // res.status(err.status || 500);
        // res.json({
        //     message: err.message,
        //     error: err
        // });
    });
}

app.use(function(err, req, res, next) {
    // res.status(err.status || 500);
    // res.json({
    //     message: err.message,
    //     error: {}
    // });
    res.redirect('/login');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
