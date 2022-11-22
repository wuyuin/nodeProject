const mongoose = require("mongoose")
// Schema相当于表
const Schema = mongoose.Schema
const UserSchema= new Schema({
  name: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
   avatar:{
     type:String,
   
   },
  date:{
    type:Date,
    default:Date.now
  },
  identity:{
    type:String,
    
  }
  
})
//User首字母必须大写是 是构造函数
User=mongoose.model("users",UserSchema)
module.exports=User