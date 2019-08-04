
const axios = require("axios");
const chalk = require("chalk");
const log = console.log;

// 鹅厂出来的东西自己都不测吗？这个方法打不开的
async function open({ dist, projectpath, time, port }) {
  return new Promise(async (resolve, reject) => {
    log();
    log(chalk.green(`打开开发者工具中...`));
    const { data } = await axios
      .get(
        `http://127.0.0.1:${port}/open`
      )
      .catch(err => {
        log(chalk.red(err.message));
      });
    
    console.log(data);
    if (data.success) {
      log(chalk.green(`打开成功`));
      resolve();
    } else {
      log(data)
      log(chalk.red(`打开失败`));
      reject();
    }
  })
}

module.exports = open;
