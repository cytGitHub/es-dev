const path = require('path');
const fs = require('fs');
const context = process.cwd();
const webpackConfig = require('../webpack.config');
const configName = 'es-config.json';
const configPath = path.resolve(context, configName);
const isHasConfig = fs.existsSync(configPath);
const configObj = {};
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const pkg = require('./pkg').join(' ');
const { runCommand } = require('./utils');

let print = (message, type = 'blue') => {
  const chalk = require('chalk');
  const { log } = console;
  log(chalk[`${type}`](message));
};

if (isHasConfig) {
  let config = JSON.parse(fs.readFileSync(configPath));
  configObj = { ...config };
}

function openServer(env) {
  const compiler = webpack({ ...webpackConfig(env) });
  const server = new WebpackDevServer(compiler, {
    open: true,
    hot: true,
  });
  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
}

function start(env) {
  // print(`正在安装依赖，当前目录${context}`);
  // runCommand('npm', ['install', pkg, '-D'], {
  //   cwd: context,
  // }).then(() => {
  //   print(`正在启动服务，请稍等...`);
  //   openServer(env);
  // });
  print(`正在启动服务，请稍等...`);
  openServer(env);
}

module.exports = start;
