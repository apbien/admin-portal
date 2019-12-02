'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (checkFinanceLogin(req)) {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

router.get('/reports', (req, res) => {
    if (checkFinanceLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Finance Reports'
        });
    } else { res.redirect('/login'); }
});

router.get('/accounts', (req, res) => {
    if (checkFinanceLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Accounts Payable'
        });
    } else { res.redirect('/login'); }
});

router.get('/receivable', (req, res) => {
    if (checkFinanceLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Accounts Receivable'
        });
    } else { res.redirect('/login'); }
}); 

router.get('/taxes', (req, res) => {
    if (checkFinanceLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Taxes'
        });
    } else { res.redirect('/login'); }
});

function checkFinanceLogin(req) {
    return (req.session.user && req.cookies.user_id && req.session.role == 'Finance Admin');
}

module.exports = router;
