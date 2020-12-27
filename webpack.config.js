const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const context = process.cwd();

module.exports = env => {
  let plugins =
    env === 'development'
      ? [
          new HtmlWebpackPlugin({
            title: 'es语法测试服务',
            template: path.resolve(__dirname, './template/index.html'),
          }),
        ]
      : [];

  return {
    entry: path.resolve(context, './src/index.js'),
    output: {
      filename: 'build.chunk.js',
      path: path.resolve(context, 'dist'),
      libraryTarget: 'umd',
    },
    mode: env === 'development' ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
      ],
    },

    plugins,
  };
};
