module.exports = {
  devServer: {
    // 开发服务器代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
      },
      "/static": {
        target: "http://127.0.0.1:7001",
      },
    },
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "mele的个人空间";
      return args;
    });
  },
  configureWebpack: require("./webpack.config"),
};
