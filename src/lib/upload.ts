
import { exec, log, } from "../util";

import openUrl from 'open'
const chalk = require("chalk");
const { getResultInfo, } = require("../util/index");

export async function upload(config) {
  await open(config);
  const { projectPath, time, compile, upload = {}, build, cli } = config;
  if (build) {
    log(`\n打包中，时间可能比较漫长，打包完毕自动打开浏览器，请等待...`);
    await exec(`cd ${projectPath} && ${build}`);
    log(chalk.green(`打包完毕，开始上传...`));
  }

  log(`cli -u ${upload.version || "1.0.0"}@${projectPath} --upload-desc ${encodeURIComponent(upload.desc)}`);
  const result = await exec(
    `cli -u ${upload.version || "1.0.0"}@${projectPath} --upload-desc ${encodeURIComponent(upload.desc)}`,
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

