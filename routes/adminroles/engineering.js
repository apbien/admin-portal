'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.redirect('/admin');
    } else { res.redirect('/login'); }
});

router.get('/monitoring', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.render('blank', {
                admin: req.session.role,
                placeholder: 'Application Monitoring'
            });
    } else { res.redirect('/login'); }
});

router.get('/techsupport', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Tech Support'
        });
    } else { res.redirect('/login'); }
});

router.get('/development', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'App Developments'
        });
    } else { res.redirect('/login'); }
});

router.get('/appadmin', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'App Admins'
        });
    } else { res.redirect('/login'); }
});

router.get('/release', (req, res) => {
    if (checkEngineerLogin(req)) {
        res.render('blank', {
            admin: req.session.role,
            placeholder: 'Release Management'
        });
    } else { res.redirect('/login'); }
});

function checkEngineerLogin(req) {
    return (req.session.user && req.cookies.user_id && req.session.role == 'Engineering Admin');
}

module.exports = router;