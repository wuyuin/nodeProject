import axios from "axios"
import { Loading,Message } from 'element-ui';

//定义加载动画
let loading;
function startLoading() {
  loading = Loading.service({lock:true,text:"拼命加载中...",background:"rgba(0,0,0,0.7)"});

}
function endLoading() {
  loading.close();

}
// 请求拦截器 响应拦截器

axios.interceptors.request.use(config => {
  startLoading()
  return config
}, error => {
  // 请求未成功发出，如：没有网络...
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 成功响应的拦截
  endLoading()
  return response
}, error =>{
  // 失败响应的拦截
  endLoading()
  Message.error(error.response.data)
  return Promise.reject(error)
})


export default axios;