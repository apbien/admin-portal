'use strict';
const express = require('express');
const router = express.Router();

/* GET default page. */
router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;
