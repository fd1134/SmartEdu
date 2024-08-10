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
    global.message.success=`Başarıyla ${req.body.name} Kaydedildi`;
    res.status(201).redirect("/courses");
  } catch (error) {
    
    global.message.err=`Bir Hatta Oluştu`;

    res.status(400).redirect("/courses");
  }
};

exports.getAllCourses= async (req,res)=>{
let filter={}
const categorySlug=req.query.categories;
const query=req.query.search;
  try {
    const category=await Category.findOne({slug:categorySlug});

   
    if (categorySlug) {
      filter={category:category._id}      
    }

    if(query){
      filter={name:query }
    }

    if(!query && !categorySlug){

      filter.name="",
      filter.category=null
    }
    const courses= await Course.find({
      $or:[
        {name:{ $regex:'.*' +filter.name + '.*', $options: 'i'}},
        {category:filter.category}
      ]
    }).sort("-createdAT").populate("author");
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
    const user=await User.findById(req.session.userID);
    const categories=await Category.find();
    res.status(200).render("course-single",{
      page_name:'courses',
      course,
      user,
      categories
    });
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });
    
  }
};

exports.enrollCourse=async (req,res)=>{

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

exports.releaseCourse=async (req,res)=>{
  try {
   const user=await User.findById(req.session.userID);
   await user.courses.pull(req.body.course_id);
   await user.save();
   res.status(200).redirect("/users/dashboard");
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });   
  }
};

exports.deleteCourse=async (req,res)=>{
  try {
   const course= await Course.findOneAndDelete({slug:req.params.slug});
   global.message.err=`Başarıyla ${ course.name} Kursu Silindi`;
   res.status(200).redirect("/users/dashboard");
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });   
  }
};

exports.updateCourse=async (req,res)=>{
  try {
  const course=await Course.findOne({slug:req.params.slug});
  let courseName=course.name;
  course.name=req.body.name;
  course.description=req.body.description;
  course.category=req.body.category;
  course.save();
   
   global.message.success=`Başarıyla ${ courseName} Kursu Güncellendi`;
   res.status(200).redirect("/users/dashboard");
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });   
  }
};
