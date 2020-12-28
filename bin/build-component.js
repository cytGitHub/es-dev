/**
 * 用来构建react-component组件
 */

const fs = require('fs');
const path = require('path');
const context = process.cwd();
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const componentPreset = [['@babel/preset-env'], ['@babel/preset-react']];
const esPreset = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      modules: 'umd',
      corejs: 2,
      targets: {
        chrome: '58',
        ie: '11',
      },
    },
  ],
];
const entry = 'src';
const output = 'es';
const { log } = console;
const { isDir, runCommand } = require('./utils');
const pkg = require('./pkg').join(' ');

/**
 * 获取预设
 * @param {string} type
 */
const transformOptions = type => {
  let presets =
    type === '-c' || type === '--component' ? componentPreset : esPreset;
  let plugins =
    type === '-c' || type === '--component'
      ? []
      : [['@babel/plugin-transform-runtime']];

  return {
    presets,
  };
};

/**
 * @param {*} fileContent 文件内容
 * @param {*} plugins 插件
 */
const transformFile = (filePath, type) => {
  let code;
  let extname = path.extname(filePath);
  if (extname === '.js') {
    let fileContent = fs.readFileSync(filePath);
    let options = transformOptions(type);
    code = require('@babel/core').transformSync(fileContent, options).code;
  }
  let buildPath = filePath.replace(entry, output);
  let pathDir = path.dirname(buildPath);
  mkdirp.sync(pathDir);
  fs.writeFileSync(buildPath, code);
};

/**
 * 返回目录文件列表
 * @param {string} target
 */
const getFileList = (target, list) => {
  let component = list || [];
  let files = fs.readdirSync(target);
  files.forEach(file => {
    let filePath = path.resolve(target, file);
    isDir(filePath)
      ? getFileList(filePath, component)
      : component.push(filePath);
  });
  return component;
};

const install = () => {
  log(chalk.green('正在安装构建依赖'));
  return runCommand('npm', ['install', pkg, '-D']);
};

const build = type => {
  install().then(() => {
    log(chalk.green('构建依赖下载成功'));
    let files = getFileList(path.resolve(context, entry));
    files.forEach(path => {
      log(chalk.blue(path));
      transformFile(path, type);
    });
    log(chalk.blue('构建完成！'));
  });
};

module.exports = build;
