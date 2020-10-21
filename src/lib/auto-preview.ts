import * as fs from 'fs'
import chalk from 'chalk'
import { exec, log } from '../util/index';

const debounce = require("lodash.debounce");

let watcher = null;
let staring = false;

export async function autoPreivew(config) {
  watcher && watcher.close();

  const { projectPath, time, compile, cliPath, dist, } = config;

  const cb = async (evt = {}, filename = '') => {
    if (staring) return ;

    filename && (console.log(`\n${filename} ${evt}\n${chalk.yellow('自动预览重启中...')}`));

    const cmd = `cli auto-preview --project ${projectPath} --compile-condition ${compile}`
    log(
      `执行命令： ${cmd}`
    );
      
    staring = true;
    const result = await exec(
      cmd,
      {
        cwd: cliPath
      }
    );

    staring = false
    log(chalk.green(`自动预览完成`), result);
  }
  log(`\n${chalk.yellow('开始监听文件变动')}\n路径参数: `, compile);

  cb()
  fs.watch(
    dist,
    { recursive: true },
    debounce(cb, time)
  );
}
