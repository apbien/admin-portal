'use strict';
const express = require('express');
const router = express.Router();

/* Engineering home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'engineering_admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/*GET pages for ENGINEERING ADMIN*/
router.get('/docmanager', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'engineering_admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Engineering Document Manager Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/optasks', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'engineering_admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Engineering Operational Tasks Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/reports', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'engineering_admin') {
        res.render('blank', { admin: req.session.role , placeholder: 'Engineering Reports Page' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
