'use strict';
const express = require('express');
const router = express.Router();

/* Finance Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/*GET pages for  ADMIN*/
router.get('/accounts', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Financial Account Manager Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/liabilities', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Financial Liability Manager Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/transactions', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Financial Transaction Manager Page' });
    }
    else { res.redirect('/login'); }
}); router.get('/records', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Invoice and Tax Payment Records Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/reports', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'finance_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Financial Reports Page' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
