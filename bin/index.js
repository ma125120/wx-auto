#! /usr/bin/env node

const run = require("../lib/index");
const program = require("commander");
const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const path = require("path");
const { getPath, getHttpPort, getDist } = require("../util/index");

program
  .option("-c, --config <type>", "config file，配置文件名，默认为auto.js", "auto.js")
  .option("-d, --desc <type>", "upload desc，上传描述", "")
  .option("-t, --type <type>", "auto type, etc: preview, auto-preview, upload，自动类型",)
  .parse(process.argv);

const CD = process.cwd();
const Config = program.config;
const ConfigFile = path.join(CD, Config);

const defaultCompile = {
  pathName: `pages/home/index`
};

if (!fs.existsSync(ConfigFile)) {
  throw new Error(`[ERROR]: ${Config} not found in ${CD}`);
} else {
  start();
}

function start() {
  let config = require(ConfigFile);
  config = { ...config };
  config.projectpath = getPath(
    config.projectpath,
    `配置文件中projectPath字段必须有值`
  );
  const projectpath = config.projectpath;
  config.dist = getDist(config);
  config.compile = JSON.stringify(config.compile || defaultCompile).replace(
    /\"/g,
    `\\"`
  );
  config.upload = config.upload || {};
  config.upload.desc = config.upload.desc || program.desc;
  config.open = program.open || config.open;
  // config.port = getHttpPort();

  run(config, program.type || config.type || "auto-preview");
}
