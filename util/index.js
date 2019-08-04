const path = require("path");
const fs = require("fs");
const os = require("os");

function getHttpPort() {
  const home = os.homedir();
  const suffix =
    os.platform() === `win32`
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

module.exports = {
  getHttpPort,
  getPath,
  getDist
};
