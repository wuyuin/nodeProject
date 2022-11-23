import Vue from "vue"
import Router from "vue-router"
import Index from "./viws/Index.vue"
import Register from "./viws/Register.vue"
import NotFound from "./viws/NotFound.vue"
import Login from "./viws/Login.vue"





Vue.use(Router)
export default  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
      {path:"/",
      redirect:"/index",
},
      {path:"/index",
      name:"index",
      component:Index
},
    {
  path:"/register",
  name:"register",
  component:Register
},
{
  path:"/login",
  name:"login",
  component:Login
},
{
  path:"*",
  name:"404",
  component:NotFound
}




  ]
})