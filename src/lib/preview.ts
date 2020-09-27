import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import chalk from 'chalk'
import { exec, log } from '../util';
import { startServer, updateHtml } from '../util/server';
const debounce = require("lodash.debounce");

let watcher = null;
let staring = false;

const temp = os.tmpdir()

export async function preview(config) {
  watcher && watcher.close();

  const { projectPath, time, compile, cliPath, qr, dist, } = config;

  log(`\n${chalk.yellow('开始监听文件变动')}\n路径参数: `, compile);

  const tempImg = `${temp}/wx-auto/${qr}`
  const dir = path.dirname(tempImg)

  const cb = async (evt = {}, filename = '') => {
    if (staring) return ;

    filename && (console.log(`\n${filename} ${evt}\n${chalk.yellow('预览重启中...')}`));

    try {
      fs.mkdirSync(dir)
    } catch(err) {}

    const cmd = `cli preview --qr-format image --qr-output ${tempImg} --project ${projectPath} --compile-condition ${compile}`
    log(`执行命令： ${cmd}`);

    staring = true;
    const result = await exec(
      cmd,
      {
        cwd: cliPath
      }
    );

    updateHtml(dir, qr, Date.now())
    staring = false
    log(chalk.green(`预览完成`));
  }

  cb();
  startServer(dir, qr)
  fs.watch(
    dist,
    { recursive: true },
    debounce(cb, time)
  );
}

