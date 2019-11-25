'use strict';
var express = require('express');
var router = express.Router();

/* GET default page. */
router.get('/', (req, res) => {
    res.redirect('/login');
});



module.exports = router;
