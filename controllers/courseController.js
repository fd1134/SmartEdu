const Course = require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");


exports.createCourse = async (req, res) => {
  try {

   /* 
    await Course.create({
    name:req.body.name,
    description:req.body.description,
    category:req.body.category,
    author:req.session.userID
  });
    aşağıdaki ile aynı :)
   */
 
   
     await Course.create({...req.body,author: req.session.userID});
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.getAllCourses= async (req,res)=>{
const categorySlug=req.query.categories;
  try {
    const category=await Category.findOne({slug:categorySlug});

    let filter={}
    if (categorySlug) {
      filter={category:category._id}      
    }

    const courses= await Course.find(filter).sort("-createdAT");
    const categories=await Category.find();
   // res.status(200).json({status:"Success",courses});
   res.status(200).render("courses",{
    page_name:"courses",
    courses,
    categories
   });
    
  } catch (error) {
    res.status(400).json({
      status:'Fail',
      error
    });
  }

};

exports.getCourse= async (req,res)=>{
  try {
    const course=await Course.findOne({slug:req.params.slug}).populate("author");
    
    
    res.status(200).render("course-single",{
      page_name:'courses',
      course,
    });
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });
    
  }
};

exports.enrollCorse=async (req,res)=>{

  try {
    const user=await User.findById(req.session.userID);
   await  user.courses.push(req.body.course_id);
   await user.save();
    res.status(200).redirect("/users/dashboard");
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });
    
  }

};
