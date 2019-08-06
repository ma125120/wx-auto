#! /usr/bin/env node

const run = require("../lib/index");
const program = require("commander");
const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const path = require("path");
const { getPath, getHttpPort, getDist } = require("../util/index");

program
  .option("-c, --config <type>", "config file", "auto.js")
  .option("-t, --type <type>", "auto type, etc: preview, upload", "preview")
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
  // config.port = getHttpPort();

  run(config, program.type);
}
