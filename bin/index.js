#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('0.1.0')
  .description('启动调试服务')
  .command('dev')
  .action(function () {
    require('./dev')('development');
  });

program
  .version('0.1.0')
  .description('构建命令')
  .command('build')
  .option('-c,--component', '构建React组件')
  .option('-e,--ecma', '构建Es6到Es5')
  .action(function (cwd) {
    let buildType = cwd.parent.rawArgs[3] || '';
    require('./build-component')(buildType);
  });

program.parse(process.argv);
