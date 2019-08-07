const path = require("path");
const fs = require("fs");
const os = require("os");
const isWin = os.platform() === `win32`;
const promisify = require("util").promisify;
let { exec } = require("child_process");
exec = promisify(exec);
const chalk = require("chalk");
const log = console.log;

function getHttpPort() {
  const home = os.homedir();
  const suffix = isWin
    ? `/AppData/Local/微信开发者工具/User Data/Default/.ide`
    : `/Library/Application Support/微信开发者工具/Default/.ide`;
  const idePath = home + suffix;

  const port = fs.readFileSync(idePath, { encoding: "utf8" });

  return port;
}

function getPath(projectpath, msg) {
  if (!projectpath) {
    throw new Error(msg);
  }
  return projectpath.split(path.sep).join(`/`);
}

function getDist(config = {}) {
  const { projectpath } = config;
  return (
    config.dist ||
    (/dist\/?$/.test(projectpath) ? projectpath : (projectpath || "") + `/dist`)
  );
}

function getResultInfo(result, prefix,) {
  const flag = /success/g.test(result.stdout);
  flag ? log(chalk.green(`${prefix}成功`)) : log(chalk.red(`${result.stdout}`))
  return flag; 
}

module.exports = {
  getHttpPort,
  getPath,
  getDist,
  exec,
  getResultInfo
};
