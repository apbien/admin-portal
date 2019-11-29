'use strict';
const express = require('express');
const router = express.Router();

/* GET admin home page. */
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_id /*&& req.session.role.includes('admin')*/) {//if there is a user currently logged in
        /*Which do you like better?
        Option 1
        switch(req.session.role){
            case 'finance_admin':
                res.render('admin',{admin: req.session.role, title: 'Financial'});
                break;
            case 'sale_admin':
                res.render('admin',{admin: req.session.role, title: 'Sales'});
                break;
            case 'hr_admin':
                res.render('admin',{admin: req.session.role, title: 'HR'});
                break;
            case 'engineering_admin':
                res.render('admin',{admin: req.session.role, title: 'Engineering'});
                break;
            default:
                res.render('admin', { admin: true });
        }
        Option 2
        var title;
        switch(req.session.role){
            case 'finance_admin':
                title = 'Financial';
                break;
            case 'sale_admin':
                title = 'Sales';
                break;
            case 'hr_admin':
                title = 'HR';
                break;
            case 'engineering_admin':
                title = 'Engineering';
                break;
            default:
                title = null;
        }
        if(title == null){res.render('admin', {admin: 'admin')};}
        else {res.render('admin', {admin: req.session.role, title: title});}
        */
        res.render('admin', { admin: 'hr_admin', title: 'HR' });
    }
    else { res.redirect('/login'); }
});

/*GET pages for ADMIN to manage users, assigning roles to users, and the help desk*/
router.get('/manage', (req, res) => {
    if (req.session.user && req.cookies.user_id /*&& req.session.role.includes('admin')*/) {
        res.render('blank', { /*admin: req.session.role , */placeholder: 'Manage Users Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/assign', (req, res) => {
    if (req.session.user && req.cookies.user_id /*&& req.session.role.includes('admin')*/) {
        res.render('blank', { /*admin: req.session.role , */placeholder: 'Assign User Roles Page' });
    }
    else { res.redirect('/login'); }
});
router.get('/help', (req, res) => {
    if (req.session.user && req.cookies.user_id /*&& req.session.role.includes('admin')*/) {
        res.render('blank', { /*admin: req.session.role , */placeholder: 'Help Desk Page' });
    }
    else { res.redirect('/login'); }
});

module.exports = router;
