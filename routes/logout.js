'use strict';
const express = require('express');
const router = express.Router();

/* GET default page. */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id) {
        res.clearCookie('user_id');
    }
    res.redirect('/login');
});


module.exports = router;
