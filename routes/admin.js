'use strict';
const express = require('express');
const router = express.Router();


/* GET admin home page. */
router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) //if there is a user currently logged in
    {
        res.render('admin', {admin:true})
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;
