'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../models/login');
const User = require('../models/user');
const UserRole = require('../models/userrole');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', (req, res) => {
    if (!req.body.user_first_name || !req.body.user_last_name || !req.body.user_email) {
        res.redirect('/login');
    } else {
        User.create({
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_email: req.body.user_email
        }).then(user => {
            const salt = bcrypt.genSaltSync();
            var password = bcrypt.hashSync(req.body.login_password, salt);
            Login.create({
                login_id: req.body.login_id,
                login_password: password,
                user_login_fk: user.user_id
            })
            UserRole.create({
                user_role_fk: req.body_user_id,
                role_user_fk: 6
            })
            res.redirect('/login');
        })
    }
});

module.exports = router;