'use strict';
const express = require('express');
const router = express.Router();

/* Sales Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'sales_admin') {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/*GET pages for SALES ADMIN*/
router.get('/compprof', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'sales_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Sales Company Profit Margin Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/procorders', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'sales_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Sales Process Orders Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/logs', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'sales_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Sales Logs Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/reports', (req, res) => {
    if (req.session.user && req.cookies.user_id && req.session.role == 'sales_admin') {
        res.render('blank', { admin: req.session.role, placeholder: 'Sales Reports Page' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
