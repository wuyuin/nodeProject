const mongoose = require("mongoose")
// Schema相当于表
const Schema = mongoose.Schema
const ProfileSchema= new Schema({
  
  type:{
    type:String,
    
  },
  describe: {
    type:String
  },
  income: {
    type:Number,
    required:true
  },
  expend: {
    type:Number,
    required:true
  },
  cash:{
    type:Number,
    required:true
  },
  remark: {
    type:String,

  },
  date:{
    type:Date,
    default:Date.now
  }
  
})
//User首字母必须大写是 是构造函数
Profile=mongoose.model("profiles",ProfileSchema)
module.exports=Profile