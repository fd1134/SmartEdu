const express=require("express");
const { query,body } = require('express-validator');

const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authMiddleware");
const User=require("../models/User");

const router=express.Router();

router.route("/signup").post([
    body('name').not().isEmpty().withMessage("Lütfen İsim Alanını  Giriniz "),
    body('email').isEmail().withMessage("Lütfen Email Doğru Giriniz ").custom((userEmail)=>{
        return User.findOne({email:userEmail}).then(user => {
            if (user) {
                return Promise.reject('Email is already exists!')
            }
    })}),
    body('password').not().isEmpty().withMessage("Lütfen Şifre Alanını  Giriniz ") 

    
],authController.createUser);//http://localhost:3000/users/siqnup
router.route("/login").post(authController.loginUser);//http://localhost:3000/users/siqnup
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);

module.exports=router;