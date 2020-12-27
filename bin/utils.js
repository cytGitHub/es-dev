const fs = require('fs');
module.exports = {
  runCommand(command, args, options) {
    const cp = require('child_process');
    return new Promise((resolve, reject) => {
      const executedCommand = cp.spawn(command, args, {
        shell: true,
        ...options,
      });

      executedCommand.on('error', error => {
        reject(error);
      });

      executedCommand.on('exit', code => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  },
  /**
   * 判断是否是目录
   * @param {*} path
   */
  isDir(path) {
    return fs.statSync(path).isDirectory();
  },
};
