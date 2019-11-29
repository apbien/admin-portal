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
    Login.findByPk(req.body.login_id) //Find a login from the DB using the inputted username as a comparison to login's PK
        .then(login => {
            if (login) { //if a login with the same inputted username is found int he DB
                User.findByPk(login.user_login_fk) //find the user data attached to that login using the FK
                    .then(user => {
                        if (user.employment_status != 'terminated') { //check user data to see if they're terminated before continuing
                            bcrypt.compare(req.body.login_password, login.login_password, (err, result) => { //compare DB vs input password
                                if (result) { //if the passwords match
                                    req.session.user = user.user_id; //remember the session of the user logged in
                                    res.redirect('/home');
                                } else { loginError(); }
                            })
                        }else { loginError(); }
                })
            }else { loginError(); }
        })
        .catch(err => { res.status(400).json({ error: err }); })

    function loginError() { res.render('login', { username: '', loginError: 'Invalid login credentials.', login: true }); }

    /* IF WE KEEP THE ORIGINAL DATABASE STRUCTURE
    function getRole(){
        User.findByPk(req.session.user)
            .then(user=>{
                UserRole.findOne({
                    where:{
                        user_role_fk: user.user_id
                    }
                    order: [
                        ['role_user_fk','DESC']
                    ]
                })
                        .then(userRole=>{
                            Role.findByPk(userRole.role_user_fk)
                                .then(role=>{
                                    return role.role_name;
                                })
                        })
            })
            .catch(err=>{res.status(400).json({ error: err });})
   
    */
    /* FOR IF WE REWORKED THE DATABASE
    function getRole(){
        User.findByPk(req.session.user)
            .then(user=>{
                Role.findByPk(user.user_role_fk)
                    .then(role=>{
                        return role.role_name;
                    })
            })
            .catch(err=>{res.status(400).json({ error: err });})

    */
});

//return router
module.exports = router;