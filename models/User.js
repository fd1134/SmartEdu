const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique:true
      },
      password:{
        type: String,
        required: true,

      },
      role:{
        type:String,
        enum:["Student","Teacher","Admin"],
        default:"Student"
      },
      courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
      }]
  
});

/*
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password,10,(err,hash)=>{
    this.password=hash;
    next();
  });

});
*/

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

const User=mongoose.model("User",UserSchema);

module.exports=User;