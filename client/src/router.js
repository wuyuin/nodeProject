import Vue from "vue"
import Router from "vue-router"
import Index from "./viws/Index.vue"
import Register from "./viws/Register.vue"
import NotFound from "./viws/NotFound.vue"
import Login from "./viws/Login.vue"
import Home from "./viws/Home.vue"
import InfoShow from "./viws/InfoShow.vue"
import FundList from "./viws/FundList.vue"





Vue.use(Router)
const router =   new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
      {path:"/",
      redirect:"/index",
},
      {path:"/index",
      name:"index",
      component:Index,
      children:[
        {
          path:"/home",
          name:"home",
          component:Home
        },
        {
          path:"",
         component:Home
        },
        {
          path:"/infoshow",
         component:InfoShow,
         name:"infoshow"
        },
        {
          path:"/fundlist",
         component:FundList,
         name:"fundlist"
        },
      ]
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


//路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})
export default router;