'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../models/login');
const User = require('../models/user');

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id) {
        res.redirect('/home');
    } else {
        res.render('login', { login: true });
    }
});

router.post('/', (req, res) => {

    const loginData = //create an array of variables using the information from the login page
    {
        login_id: req.body.login_id,
        login_password: req.body.login_password
    };

    Login.findOne //function to find a login from the DB
    ({
        where: {
            login_id: loginData.login_id
        }
    })
        .then(login => //pass login through the function
        {
            if (login) {
                const userLoginFK = login.user_login_fk;
                User.findOne({
                    where: {
                        user_id: userLoginFK
                    }
                }).then(user => {
                    if (user.employment_status != 'terminated') {
                        bcrypt.compare(loginData.login_password, login.login_password, (err, result) => {
                            if (result) {
                                req.session.user = user.user_id;
                                res.redirect('/home');
                            } else { loginError(); }
                        })
                    } else { loginError();  }
                })
            } else { loginError(); }
        })
        .catch(err => //to catch if any other error occurs
        {
            res.status(400).json({ error: err });
        })

    function loginError() {
        res.render('login', { username: '', loginError: 'Invalid login credentials.', login:true });
    }
});

//return router
module.exports = router;