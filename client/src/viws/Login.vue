<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">汇法链管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        class="loginForm"
        ref="loginForm"
        label-width="60px"
      >

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="loginUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="loginUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在<router-link to='/register'>注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
//前端解析token
import jwt_decode from "jwt-decode"
export default {
  name: "Login",
  data () {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {

        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],

      }







    }


  },
  methods: {

    /* submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(res => {
              //登陆成功返回一个token 后端定义了以Bearer 开头+token
              console.log(res)
              //token处理
              const { token } = res.data
              //将服务器返回给客户端的token 存到localStorage里面
              localStorage.setItem("eleToken", token)
              // 解析存到localStorage里的token
              const decoded = jwt_decode(token)
              // console.log(decoded)
              // 将解析出来的token存到vuex中
              this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded))
              this.$store.dispatch(" setUser", decoded)
              this.$router.push("/index")

            });

        }
      })

    }, */

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            // 登录成功
            const { token } = res.data;
            localStorage.setItem("eleToken", token);

            // 解析token
            const decode = jwt_decode(token);

            // 存储数据
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);

            // 页面跳转
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },

}

</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>