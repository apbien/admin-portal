'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET default page. */
router.get('/', (req, res) => {
    console.log(req.session.user);
    console.log(req.cookies.login_id);
    if (req.session.user && req.cookies.login_id) {
        res.clearCookie('login_id');
    }
    res.redirect('/login');
});



module.exports = router;
