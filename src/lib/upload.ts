
import { exec, log, } from "../util/index";

import openUrl from 'open'
const chalk = require("chalk");
const { getResultInfo, } = require("../util/index");

export async function upload(config) {
  const { projectPath, cliPath, build, upload } = config;

  if (build) {
    log(`\n打包中，时间可能比较漫长，打包完毕自动打开浏览器，请等待...`);
    await exec(`cd ${projectPath} && ${build}`);
    log(chalk.green(`打包完毕，开始上传...`));
  }

  const cmd = `cli upload --project ${projectPath} -v ${upload.version || "1.0.0"} -d ${encodeURIComponent(upload.desc)}`
  log(cmd);
  const result = await exec(
    cmd,
    {
      cwd: cliPath
    }
  );

  const isSuccess = getResultInfo(result, `自动上传`) //result.stdout;
  openUrl(
    "https://mp.weixin.qq.com/"
  );
}

