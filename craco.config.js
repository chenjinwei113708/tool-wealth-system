const path = require('path');
const webpack = require('webpack');
const cracoAntDesignPlugin = require("craco-antd");
const sassSourcemapsPlugin = require('./webpack_plugin/craco-plugin-sass-sourcemaps');
const fastRefreshCracoPlugin = require('craco-fast-refresh');

module.exports = {
  webpack: {
    // 别名
    alias: {
      "@": path.resolve("src"),
      "api": path.resolve("src/api"),
      "~": path.resolve("src"),
      "~types": path.resolve("src/types"),
    },
    configure: (webpackConfig, { env, paths }) => {
      // 在 `package.json` build 命令里禁用
      // webpackConfig.devtool = webpackConfig.mode === 'development' ? 'cheap-module-source-map' : false;
      webpackConfig.output.path = path.resolve(__dirname, "dist") // ts编译后的文件
      paths.appBuild = path.resolve(__dirname, "dist"); // public中的文件
      webpackConfig.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/));
      return webpackConfig;
    }
  },

  devServer: {
    port: 7011,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true, //是否跨域
      },
    }
  },

  // babel: {
  //   plugins: [
  //     ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
  //   ],
  // },

  plugins: [
    { plugin: fastRefreshCracoPlugin },
    { plugin: cracoAntDesignPlugin },
    { plugin: sassSourcemapsPlugin }
  ],
};
