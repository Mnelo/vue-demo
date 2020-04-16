module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]

  // 兼容IE11
  presets: [
    [
      "@vue/app",
      {
        debug: true,
        useBuiltIns: "entry",
        polyfills: [
          "es6.promise",
          "es6.array.find-index",
          "es7.array.includes",
          "es6.string.includes",
        ],
        //项目中用到的polyfill
      },
    ],
  ],
};
