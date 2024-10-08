const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
