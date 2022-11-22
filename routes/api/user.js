const express = require("express")
const router = express.Router()
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
//全球公认的头像
const gravatar = require("gravatar")
const db = require("../../config/db")

const passport =require("passport")


const User= require("../../modules/user")

// 路由指向  公开接口 私有接口
router.get("/test",(req,res)=> {
  res.json({mag:"login"})
})
//注册带参数 name password email------ post
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity:req.body.identity
       
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// 登录  jwt 返回token 登陆成功 返回jwt
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!');
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user._id,
          name: user.name,
          identity:user.identity,
          avatar:user.avatar
          
        };
        jwt.sign(rule, db.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
        // res.json({msg:"success"});
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  });
});


// passport 验证token   token验证方式 token过期 /没有 是得不到数据
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(
  {
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity
  }




    )
      
    
  }
);

module.exports= router