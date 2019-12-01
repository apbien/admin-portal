'use strict';
const express = require('express');
const router = express.Router();

/* Engineering home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/* GET pages for ENGINEERING ADMIN */
router.get('/monitoring', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Application Monitoring' });
    }
    else { res.redirect('/login'); }
});
router.get('/techsupport', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Tech Support' });
    }
    else { res.redirect('/login'); }
});
router.get('/development', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'App Developments' });
    }
    else { res.redirect('/login'); }
});
router.get('/appadmin', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'App Admins' });
    }
    else { res.redirect('/login'); }
});
router.get('/release', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Release Management' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
