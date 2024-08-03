const bcrypt =require("bcrypt");

const User = require("../models/User");
const Category=require("../models/Category");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
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
      }
    });
  }
  
};

exports.logoutUser=(req,res)=>{
  req.session.destroy(()=>{

    res.redirect("/");
  });

};

exports.getDashboardPage=async (req,res)=>{
  const user=await User.findById(req.session.userID);
  const categories=await Category.find();
  res.render("dashboard",{
    page_name:"dashboard",
    user,
    categories
  });
};