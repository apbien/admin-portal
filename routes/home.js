'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');
const Login = require('../models/login');


/* GET admin home page. */
router.get('/', (req, res, next) => {
    if (req.session.user) {
        Login.findOne({
            where: {
                login_id: req.session.user
            }
        }).then(login => {
            var userLoginFK = login.user_login_fk;
            User.findOne({
                where: {
                    user_id: userLoginFK
                }
            }).then(user => {
                res.render('home', { firstname: user.user_first_name, lastname: user.user_last_name });
            });
        });

    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;
