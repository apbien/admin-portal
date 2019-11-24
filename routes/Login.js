'use strict';
const express = require('express');
const login = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Login = require('../models/login');


login.use(cors());

const private_key = process.env.PRIVATE_KEY; //one way to validate user session:not being used but if the other way doesn't work, I will use this

login.post('/', (req, res) => {
    
    const loginData = //create an array of variables using the information from the login page
    {
        login_id: req.body.login_id,
        login_password: req.body.login_password
    };

    Login.findOne //function to find a login from the DB
    ({
        where: {
            login_id: req.body.login_id
        }
    })
        .then(login => //pass login through the function
        {
            if (login) //if the login was found and is not returned as null
            {
                if (bcrypt.compareSync(req.body.login_password, login.login_password)) //compare the passwords using bcrypt for encryption
                {
                    //this token is not used, but will help with session retention if the other way doesn't work
                    let token = jwt.sign(login.dataValues, process.env.private_key, {
                        expiresIn: 1440
                    })
                    res.send(token);

                    //The other way is just changin req.session to equal the login and redirect them to home
                    req.session.user = login;
                    req.redirect('/home');
                }
            }
            else
            {
                //we can honestly do something else that reports it's incorrect and redirects them to /login again
                res.status(400).json({ error: 'Incorrect login information.' });
            }
        })
        .catch(err => //to catch if any other error occurs
        {
            res.status(400).json({ error: err });
        })
});

//return login
module.exports = login