import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as util from 'util'
import * as child_process from 'child_process'
import chalk from 'chalk'

const isWin = os.platform() === `win32`;
const promisify = util.promisify;

export const exec = promisify(child_process.exec);

export const log = console.log;

export function getCliPath() {
  const pathWx = process.env.PATH.split(';').find(v => v.includes(`微信web开发者工具`))
  if (!pathWx) {
    throw new Error(`请先在环境变量中添加开发者工具的路径!`);
  }

  const cliPath = isWin ? pathWx : path.resolve(pathWx, `/Contents/MacOS`)
  return cliPath;
}
// function getHttpPort() {
//   const home = os.homedir();
//   const suffix = isWin
//     ? `/AppData/Local/微信开发者工具/User Data/Default/.ide`
//     : `/Library/Application Support/微信开发者工具/Default/.ide`;
//   const idePath = home + suffix;

//   const port = fs.readFileSync(idePath, { encoding: "utf8" });

//   return port;
// }

export function getPath(projectPath, msg) {
  if (!projectPath) {
    throw new Error(msg || `项目路径不能为空`);
  }

  const nowPath = projectPath.split(path.sep).join(`/`);

  return nowPath;
}

export function getDist(nowPath) {
  const projectConfig = require(nowPath + `/project.config.json`)
  if (!projectConfig) {
    throw new Error(`项目路径下必须含有project.config.json`);
  }

  return path.resolve(nowPath, projectConfig.miniprogramRoot || "");
}

export function getResultInfo(result, prefix,) {
  const flag = /success/g.test(result.stdout);
  flag ? log(chalk.green(`${prefix}成功`)) : log(chalk.red(`${result.stdout}`))
  return flag; 
}
