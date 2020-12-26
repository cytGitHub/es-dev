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

let print = (message, type = 'blue') => {
  const chalk = require('chalk');
  const {log} = console;
  log(chalk[`${type}`](message));
};

if (isHasConfig) {
  let config = JSON.parse(fs.readFileSync(configPath));
  configObj = {...config};
}
const compiler = webpack({...webpackConfig(configObj)});

let pkg = [
  'chalk',
  'babel-loader',
  '@babel/core',
  '@babel/preset-env',
  'webpack',
].join(' ');


const runCommand = (command, args, options) => {
  const cp = require('child_process');
  return new Promise((resolve, reject) => {
    const executedCommand = cp.spawn(command, args, {
      shell: true,
      ...options,
    });

    executedCommand.on('error', (error) => {
      reject(error);
    });

    executedCommand.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

function openServer() {
  const server = new WebpackDevServer(compiler, {open: true, hot: true});
  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
}

function start() {
  print(`正在安装依赖，当前目录${context}`);
  runCommand('tnpm', ['install', pkg, '-D'], {
    cwd: context,
  }).then(() => {
    print(`正在启动服务，请稍等...`);
    openServer();
  });
}

module.exports = start;
