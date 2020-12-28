const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const context = process.cwd();

module.exports = env => {
  console.log(path.resolve(__dirname));
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
    },

    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
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
                presets: [
                  path.resolve(__dirname, 'node_modules', '@babel/preset-env'),
                  path.resolve(
                    __dirname,
                    'node_modules',
                    '@babel/preset-react'
                  ),
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },

    plugins,
  };
};
