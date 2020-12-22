#!/usr/bin/env node

const {Command} = require('commander');
const program = new Command();

program
  .version('0.1.0')
  .command('dev')
  .action(function () {
    require('./dev')();
  });

program
  .version('0.1.0')
  .command('build')
  .action(function () {
    require('./build')({}, 'production');
  });

program.parse(process.argv);
