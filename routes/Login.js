'use strict';
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const Login = require('../models/login');
const path = require('path');

//login.use(cors());

//const private_key = process.env.PRIVATE_KEY; //one way to validate user session:not being used but if the other way doesn't work, I will use this

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
            if (!login) { res.redirect('/login'); }
            else {
                if (bcrypt.compare(loginData.login_password, login.login_password)) {
                    req.session.user = login; //saves the session of the current user
                    res.redirect('/home'); // redirects them to the admin home portal
                }
                else {
                    //we can honestly do something else that reports it's incorrect and redirects them to /login again
                    res.status(400).json({ error: 'Incorrect login information.' });
                }
            }
        })
        .catch(err => //to catch if any other error occurs
        {
            res.status(400).json({ error: err });
        })
});

//return router
module.exports = router