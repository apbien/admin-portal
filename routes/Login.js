'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../models/login');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../views/login.html'));
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
                bcrypt.compare(loginData.login_password, login.login_password, (err, result) => {
                    if (result) {
                        req.session.user = login.login_id;
                        res.redirect('/admin');
                    }

                })
            }

        })
        .catch(err => //to catch if any other error occurs
        {
            res.status(400).json({ error: err });
        })
});

//return router
module.exports = router;