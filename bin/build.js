const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const chalk = require('chalk');
const rm = require('rimraf');
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const buildPath = path.resolve(cwd, 'dist');
const { log } = console;

module.exports = env => {
  let isHasPath = fs.existsSync(buildPath);
  //删除构建目录
  isHasPath && rm.sync(buildPath);
  const compiler = webpack({ ...webpackConfig(env) });
  compiler.run((error, stats) => {
    if (error || stats.hasErrors()) {
      log(chalk.red(`${stats}`));
    } else {
      log(chalk.green('构建成功！'));
    }
  });
};
