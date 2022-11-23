const express = require("express")
const app  =express()
const users = require("./routes/api/user")
const mongoose = require("mongoose")
const db = require("./config/db").mongoURL
const profiles = require("./routes/api/profile")

const bodyParser = require("body-parser")
const passport = require("passport")
 require("./config/passport")(passport)
const User = require("./modules/user")
const Profile = require("./modules/profile")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 注册用户路由 



mongoose.connect(db).then(()=> console.log("mongodb连接成功")).catch(err=> console.log(err))
// 配置passport
app.use(passport.initialize());



app.use("/api/users",users)
app.use("/api/profiles",profiles)


app.listen(80,(req,res)=> {
  console.log("80服务器启动成功")
})