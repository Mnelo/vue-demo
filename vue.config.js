// vue.config.js
module.exports = {
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    host: "192.168.42.142",
    port: 80,
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: [
        { loader: "babel-loader" }, // 增加es6 转换语法
      ],
    });
  },
  chainWebpack: (config) => {
    // 解决重新刷新页面或者重开启devServe都只取缓存，xx.work.js不更新的问题。
    // 具体讨论参考issues：https://github.com/webpack-contrib/worker-loader/issues/195
    config.module.rule("js").exclude.add(/\.worker\.js$/);

    // 使用worker-loader编译.worker.js文件
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .options({
        name: "workerName.[hash].js",
      })
      .end();
  },
};
