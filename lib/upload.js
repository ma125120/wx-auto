// const path = require("path");
// const fs = require("fs");
// const axios = require("axios");
// const os = require("os");
const { exec } = require("../util/index");
const openUrl = require("open");
const chalk = require("chalk");
const log = console.log;
const open = require("./open");

async function upload(config) {
  await open(config);
  const { dist, projectpath, time, compile, upload = {}, build, cli } = config;
  log(`打包中，时间可能比较漫长，打包完毕自动打开浏览器，请等待...`);
  await exec(`cd ${projectpath} && ${build}`);

  log(chalk.green(`打包完毕，开始上传...`));

  const result = await exec(
    `cli -u ${upload.version || "1.0.0"}@${dist} --upload-desc ${upload.desc}`,
    {
      cwd: cli
    }
  );

  const isSuccess = result.stdout;
  log(isSuccess ? chalk.green(`自动上传成功`) : chalk.red(`自动上传失败`));
  if (isSuccess) {
    openUrl(
      "https://mp.weixin.qq.com/cgi-bin/loginpage?t=wxm2-login&lang=zh_CN"
    );
  }
}

module.exports = upload;
