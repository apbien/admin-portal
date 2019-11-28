'use strict';
const express = require('express');
const router = express.Router();
//require('functions.js')();

/* GET admin home page. */
router.get('/', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) //if there is a user currently logged in
    {
        /*const roleType = getRole();
        switch(roleType){
            case 'admin':
                res.render('admin',{admin:true});
                break;
            case 'finance_admin':
                res.render('admin',{financeAdmin:true, title: 'Financial'});
                break;
            case 'sale_admin':
                res.render('admin',{salesAdmin:true, title: 'Sales'});
                break;
            case 'hr_admin':
                res.render('admin',{hrAdmin:true, title: 'HR'});
                break;
            case 'engineering_admin':
                res.render('admin',{enggAdmin:true, title: 'Engineering'});
                break;
            default:
                res.render('admin', { admin: true });
        }
        */
        res.render('admin', { admin: true });
    }
    else {
        res.redirect('/login');
    }
    /* IF WE KEEP THE ORIGINAL DATABASE STRUCTURE
    function getRole(){
        User.findByPk(req.session.user)
            .then(user=>{
                UserRole.findOne({
                    where:{
                        user_role_fk: user.user_id
                    }
                    order: [
                        ['role_user_fk','DESC']
                    ]
                })
                        .then(userRole=>{
                            Role.findByPk(userRole.role_user_fk)
                                .then(role=>{
                                    return role.role_name;
                                })
                        })
            })
            .catch(err=>{res.status(400).json({ error: err });})
        
    */
    /* FOR IF WE REWORKED THE DATABASE
    function getRole(){
        User.findByPk(req.session.user)
            .then(user=>{
                Role.findByPk(user.user_role_fk)
                    .then(role=>{
                        return role.role_name;
                    })
            })
            .catch(err=>{res.status(400).json({ error: err });})
   
    */
});

module.exports = router;
