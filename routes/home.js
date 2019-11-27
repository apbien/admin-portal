'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET employee home page. */
router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) //if there is a user currently logged in
    {
        User.findOne({ //using the session user's primary key to cross-reference with user table to pull up all their info
            where: {
                user_id: req.session.user
            }
        }).then(user => {
            res.render('home', {
                firstname: user.user_first_name,
                lastname: user.user_last_name,
                userid: user.user_id
            });
        });
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;
