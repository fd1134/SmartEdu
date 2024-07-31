const bcrypt =require("bcrypt");
const User = require("../models/User");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      user,
    });
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
        res.status(200).send("You Are Logged In");
      }
    });
  }
  
};

