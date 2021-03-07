module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.233.218:6287/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" // 通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    }
    // open: true,  // npm run serve后自动打开页面
    // host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
    // port: 8080, // 开发服务器运行端口号
    // proxy: null,
    // 注：目前本项目暂时没有写后台接口，没有跨域问题，暂时不配置proxy
  }
};
