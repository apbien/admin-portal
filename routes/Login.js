'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../models/login');
const User = require('../models/user');
const UserRole = require('../models/userrole');
const Role = require('../models/role');
const Sequalize = require('sequelize');
const Op = Sequalize.Op;

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id) {
        res.redirect('/home');
    } else {
        res.render('login', { login: true });
    }
});

router.post('/', (req, res) => {

    Login.findByPk(req.body.login_id)
        .then(login => {
            return new Promise((resolve, reject)=> {
                bcrypt.compare(req.body.login_password, login.login_password, (err, result) => {
                    if (err) { reject(err); }
                    else if (result) {
                        User.findByPk(login.user_login_fk).then(user => {
                            resolve(user);
                        })
                    }
                })
            })
            loginError();
            
        }).then(user => {
            if (user.employment_status != 'terminated') {
                req.session.user = user.user_id;
                return (
                    UserRole.findOne({
                        where: {
                            user_role_fk: user.user_id,
                            role_user_fk: { [Op.between]: [1, 5] }
                        },
                        order: [['role_user_fk', 'DESC']]
                    })
                );
            } else { throw (err); }
        }).then(userRole => {
            return Role.findByPk(userRole.role_user_fk);
        }).then(role => {
            req.session.role = role.role_name;
        }).then(finalResult => {
            res.redirect('/home');
        }).catch(err => {
            if (req.session.user) {
                res.redirect('/home');
            } else {
                loginError();
            }
        });

    function loginError() { res.render('login', { username: '', loginError: 'Invalid login credentials.', login: true }); }
    function reject() { res.render('login', { username: '', loginError: 'Invalid login credentials.', login: true }); }
});

//return router
module.exports = router;