'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET default page. */
router.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname+ '/../views/index.html'));
});

module.exports = router;
