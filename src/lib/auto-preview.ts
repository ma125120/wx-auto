import * as fs from 'fs'
import chalk from 'chalk'
import { exec, log } from '../util';

const debounce = require("lodash.debounce");

let watcher = null;
let staring = false;

export async function autoPreivew(config) {
  watcher && watcher.close();

  const { projectPath, time, compile, cliPath } = config;

  log(`\n${chalk.yellow('开始监听文件变动')}\n路径参数: `, compile);

  fs.watch(
    projectPath,
    { recursive: true },
    debounce(async (evt, filename) => {
      if (staring) return ;

      console.log(`\n${filename} ${evt}\n${chalk.yellow('自动预览重启中...')}`);

      log(
        `执行命令： cli auto-preview --project ${projectPath} --compile-condition ${compile}`
      );
        
      staring = true;
      const result = await exec(
        `cli auto-preview --project ${projectPath} --compile-condition ${compile}`,
        {
          cwd: cliPath
        }
      );

      staring = false
      log(chalk.green(`自动预览完成`));
    }, time)
  );
}
