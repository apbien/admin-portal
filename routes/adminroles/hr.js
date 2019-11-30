'use strict';
const express = require('express');
const router = express.Router();

/* HR Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/* GET pages for HR ADMIN */
router.get('/newemployees', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'New Hires' });
    }
    else { res.redirect('/login'); }
});
router.get('/onboarding', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'On-Boarding Employees' });
    }
    else { res.redirect('/login'); }
});
router.get('/hrbenefits', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Benefits' });
    }
    else { res.redirect('/login'); }
});
router.get('/payroll', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Payroll' });
    }
    else { res.redirect('/login'); }
});
router.get('/terminations', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Terminations' });
    }
    else { res.redirect('/login'); }
});
router.get('/reports', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'hr_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'HR Reports' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
