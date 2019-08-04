
const promisify = require("util").promisify;
let { exec } = require("child_process");
exec = promisify(exec);
const chalk = require("chalk");
const log = console.log;

// 鹅厂出来的东西自己都不测吗？这个方法打不开的
async function open({ projectpath, cli, }) {
  return new Promise(async (resolve, reject) => {
    log();
    log(chalk.green(`打开开发者工具中...`));
    const result = await exec(
      `cli -o ${projectpath}`,
      {
        cwd: cli
      }
    );

    const isSuccess = result.stdout;
    log(isSuccess ? chalk.green(`打开成功`) : chalk.red(`打开失败`));
    isSuccess ? resolve() : reject();
  })
}

module.exports = open;
