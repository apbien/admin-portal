'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');


/* GET employee home page. */
router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) { //if there is a user currently logged in
        User.findByPk(req.session.user)
            .then(user => {
                res.render('home', {
                    firstname: user.user_first_name,
                    lastname: user.user_last_name,
                    userid: user.user_id
                });
            })
            .catch(err => { res.status(400).json({ error: err });})
    }
    else { res.redirect('/login'); }
});

/* GET employee calendar page. */
router.get('/calendar', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) { res.render('blank', { placeholder: 'Calendar Page' }); }
    else { res.redirect('/login'); }
});

/* GET employee benefits and insurance page. */
router.get('/benefits', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) { res.render('blank', { placeholder: 'Benefits and Insurance' }); }
    else { res.redirect('/login'); }
});

/* GET employee timesheets page. */
router.get('/timesheets', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) { res.render('blank', { placeholder: 'Timesheets' }); }
    else { res.redirect('/login'); }
});

module.exports = router;
