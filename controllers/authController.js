const bcrypt =require("bcrypt");
const {validationResult } = require('express-validator');

const User = require("../models/User");
const Category=require("../models/Category");
const Course=require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
   const result = validationResult(req);
   global.message.err="";
    for (let index = 0; index < result.array().length; index++) {
      
      global.message.err += result.array()[index].msg
    }
   

    res.status(400).redirect("/register");
  }
};

exports.loginUser= async (req,res)=>{
  const {email,password}=req.body;
  const user= await User.findOne({email});
  if(user)
  {
    bcrypt.compare(password,user.password,(err,same)=>{
     if(same){
      //User Sesion 
      req.session.userID=user._id;
      res.status(200).redirect("/users/dashboard");

     }else{
      global.message.err="Girdiğin Şifre Yanlış"
      res.status(400).redirect("/login");

     }
    });
  }
  else{
    global.message.err="Böyle Bir Kullanıcı Yok";
    res.status(400).redirect("/login");

  }
  
};

exports.logoutUser=(req,res)=>{
  req.session.destroy(()=>{

    res.redirect("/");
  });

};

exports.getDashboardPage=async (req,res)=>{
  const user=await User.findById(req.session.userID).populate("courses");
  const courses=await Course.find({author:req.session.userID});
  const categories=await Category.find();
  const users=await User.find();
  res.render("dashboard",{
    page_name:"dashboard",
    user,
    categories,
    courses,
    users
  });
};

exports.deleteUser=async (req,res)=>{

  try {
    const user=await User.findByIdAndDelete(req.params.id);
    await Course.deleteMany({author:req.params.id});
    global.message.err=`Başarıyla ${ user.name} Kullanıcı Silindi`;
    res.status(200).redirect("/users/dashboard");

    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });  
    
  }
};