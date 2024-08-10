const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    global.message.success=`Başarıyla ${ category.name} Kategorisi Eklendi`;
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.deleteCategory=async (req,res)=>{

  try {

    const category=await Category.findByIdAndDelete(req.params.id);    
    global.message.err=`Başarıyla ${ category.name} Kategorisi Silindi`;
    res.status(200).redirect("/users/dashboard");
    
  } catch (error) {
    res.status(400).json({
      status:"Fail",
      error
    });  
    
  }
};