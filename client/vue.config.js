const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = [];
let optimization = {};

// plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },
  transpileDependencies: ['vuetify'],
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    devtool: 'source-map',
    plugins,
    optimization,
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/imports.styl')],
    });
}
