import * as fs from 'fs'
import * as os from 'os'
import chalk from 'chalk'
import { exec, log } from '../util';
const debounce = require("lodash.debounce");

let watcher = null;
let staring = false;

const temp = os.tmpdir()

export async function preview(config) {
  watcher && watcher.close();

  const { projectPath, time, compile, cliPath } = config;

  log(`\n${chalk.yellow('开始监听文件变动')}\n路径参数: `, compile);

  fs.watch(
    projectPath,
    { recursive: true },
    debounce(async (evt, filename) => {
      if (staring) return ;

      console.log(`\n${filename} ${evt}\n${chalk.yellow('预览重启中...')}`);

      const tempImg = `${temp}\\1.jpg`
      const cmd = `cli preview --qr-format image --qr-output ${tempImg} --project ${projectPath} --compile-condition ${compile}`
      log(`执行命令： ${cmd}`);

      staring = true;
      const result = await exec(
        cmd,
        {
          cwd: cliPath
        }
      );

      staring = false
      log(chalk.green(`预览完成`), result);
      require('console-png').attachTo(console);

      const image = fs.readFileSync(tempImg);
console.log(image, (console as any).png);
      (console as any).png(tempImg);
    }, time)
  );
}

