const path = require("path");
const fs = require("fs");
const { exec } = require("../util/index");
const debounce = require("lodash.debounce");
const chalk = require("chalk");
const log = console.log;
const { getResultInfo, } = require("../util/index");

let watcher = null;
async function preview(config) {
  watcher && watcher.close();

  const { dist, projectpath, time, compile, cli } = config;

  log();
  log(chalk.blue(`开始监听文件变动`));
  log(`路径参数: `, compile);

  fs.watch(
    dist,
    { recursive: true },
    debounce(async (evt, filename) => {
      log();
      console.log(`${filename} ${evt}`);

      log(chalk.green(`自动预览重启中...`));
      log(
        `执行命令： cli auto-preview --project ${projectpath} --compile-condition ${compile}`
      );
      const result = await exec(
        `cli auto-preview --project ${projectpath} --compile-condition ${compile}`,
        {
          cwd: cli
        }
      );

      const isSuccess = getResultInfo(result, `自动预览`) //result.
      log(chalk.green(`自动预览完成`));
      // log(isSuccess ? chalk.green(`自动预览成功`) : chalk.red(`自动预览失败`));
    }, time || 1000)
  );
}

module.exports = preview;
