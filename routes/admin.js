'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET admin home page. */
router.get('/', (req, res, next) => {
    if (req.session.user) {
        res.sendFile(path.resolve(__dirname + '/../views/admin.html'));
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;
