'use strict';
const express = require('express');
const router = express.Router();

/* Finance Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/* GET pages for FINANCE ADMIN */
router.get('/reports', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Finance Reports' });
    }
    else { res.redirect('/login'); }
});
router.get('/accounts', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Accounts Payable' });
    }
    else { res.redirect('/login'); }
});
router.get('/receivable', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Accounts Receivable' });
    }
    else { res.redirect('/login'); }
}); 
router.get('/taxes', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Taxes' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
