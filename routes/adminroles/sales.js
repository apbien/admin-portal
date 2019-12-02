'use strict';
const express = require('express');
const router = express.Router();

/* Sales Admin home page doesn't exist so it takes them back to admin */
router.get('/', (req, res) => {
    if (checkSalesLogin(req)) {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

/* GET pages for SALES ADMIN */
router.get('/reports', (req, res) => {
    if (checkSalesLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Sales Reports'
        });
    } else { res.redirect('/login'); }
});
router.get('/leads', (req, res) => {
    if (checkSalesLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Sales Leads'
        });
    } else { res.redirect('/login'); }
});
router.get('/demo', (req, res) => {
    if (checkSalesLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Sales Demo'
        });
    } else { res.redirect('/login'); }
});

function checkSalesLogin(req) {
    return (req.session.user && req.cookies.user_id && req.session.role == 'Sales Admin');
}

module.exports = router;