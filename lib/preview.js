const path = require("path");
const fs = require("fs");
const axios = require("axios");
// const os = require("os");
// const promisify = require("util").promisify;
const debounce = require("lodash.debounce");
const chalk = require("chalk");
const log = console.log;
const { getHttpPort } = require("../util/index");
// const open = require('./open')

async function preview(config) {
  // await open(config);

  const port = getHttpPort();
  const { dist, projectpath, time, compile } = config;

  log();
  log(chalk.blue(`开始监听文件变动`));
  log(`路径参数: `, compile);
  let isLoading = false;
  const watcher = fs.watch(
    dist,
    debounce(async (evt, filename) => {
      log();
      console.log(`${filename} ${evt}`);

      if (isLoading) return;
      isLoading = true;

      log(chalk.green(`自动刷新重启中...`));
      const { data } = await axios
        .get(
          `http://127.0.0.1:${port}/autopreview?projectpath=${encodeURIComponent(
            projectpath
          )}&compilecondition=${compile}`
        )
        .finally(() => {
          // log(chalk.red(err.message));
          isLoading = false;
        });

      log(data.success ? chalk.green(`自动刷新成功`) : log.red(`自动刷新失败`));
      isLoading = false;
    }, time || 1000)
  );
}

module.exports = preview;
