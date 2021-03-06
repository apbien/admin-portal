'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        User.findByPk(req.session.user)
            .then(user => {
                res.render('home', {
                    firstname: user.user_first_name,
                    lastname: user.user_last_name,
                    userid: user.user_id,
                    admin: req.session.role
                });
            })
            .catch(err => { res.status(400).json({ error: err });})
    } else { res.redirect('/login'); }
});

router.get('/calendar', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Calendar Page'
        });
    } else { res.redirect('/login'); }
});

router.get('/benefits', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Benefits and Insurance'
        });
    } else { res.redirect('/login'); }
});

router.get('/timesheets', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Timesheets'
        });
    } else { res.redirect('/login'); }
});

module.exports = router;