'use strict';
const express = require('express');
const router = express.Router();

/* HR Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/*GET pages for HR ADMIN*/
router.get('/employees', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'HR Employee Manager Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/salary', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'HR Salary Manager Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/performance', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'HR Performance Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/incidents', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'HR Incident Reports Page' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
