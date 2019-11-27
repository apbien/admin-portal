'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET default page. */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.login_id) {
        res.clearCookie('login_id');
    }
    res.redirect('/login');
});


module.exports = router;
