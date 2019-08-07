// const path = require("path");
// const fs = require("fs");
// const axios = require("axios");
// const os = require("os");
const { exec } = require("../util/index");
const openUrl = require("open");
const chalk = require("chalk");
const log = console.log;
const open = require("./open");
const { getResultInfo, } = require("../util/index");

async function upload(config) {
  await open(config);
  const { dist, projectpath, time, compile, upload = {}, build, cli } = config;
  if (build) {
    log();
    log(`打包中，时间可能比较漫长，打包完毕自动打开浏览器，请等待...`);
    await exec(`cd ${projectpath} && ${build}`);
    log(chalk.green(`打包完毕，开始上传...`));
  }

  log(`cli -u ${upload.version || "1.0.0"}@${dist} --upload-desc ${encodeURIComponent(upload.desc)}`);
  const result = await exec(
    `cli -u ${upload.version || "1.0.0"}@${dist} --upload-desc ${encodeURIComponent(upload.desc)}`,
    {
      cwd: cli
    }
  );

  const isSuccess = getResultInfo(result, `自动上传`) //result.stdout;
  // log(isSuccess ? chalk.green(`自动上传成功`) : chalk.red(`自动上传失败`));
  if (isSuccess && config.open) {
    openUrl(
      "https://mp.weixin.qq.com/"
    );
  }
}

module.exports = upload;
