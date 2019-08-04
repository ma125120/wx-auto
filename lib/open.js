

const { exec } = require('../util/index')
const chalk = require("chalk");
const log = console.log;

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
