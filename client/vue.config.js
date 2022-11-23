const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //前端配置跨域
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hot: false,
    
    proxy: {
      "/api": {
        target: "http://localhost:80/api",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

})
