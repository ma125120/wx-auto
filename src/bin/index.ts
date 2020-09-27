#! /usr/bin/env node

import program from 'commander'
import * as fs from 'fs'
import * as path from 'path'
import { run } from '../lib';
import { getCliPath, getDist, getPath } from '../util';

program
  .option("-c, --config <type>", "config file，配置文件名，默认为auto.js", "auto.js")
  .option("-d, --desc <type>", "upload desc，上传描述", "")
  .option("-t, --type <type>", "auto type, etc: preview, auto-preview, upload，自动类型", "auto-preview")
  .option("--qr <qr>", "qr name， 生成的二维码图片名", "1.png")
  .parse(process.argv);

const cwd= process.cwd();
const _config = program.config;
const configPath = path.join(cwd, _config);

const defaultCompile = {
  pathName: `pages/home/index`
};

if (!fs.existsSync(configPath)) {
  throw new Error(`[ERROR]: ${_config} not found in ${cwd}`);
} else {
  start();
}

function start() {
  let config = require(configPath);
  config = { 
    ...config,
    cliPath: getCliPath(),
    projectPath: getPath(
      config.projectPath,
      `配置文件中projectPath字段必须有值`
    ),
    compile: JSON.stringify(config.compile || defaultCompile).replace(
      /\"/g,
      `\\"`
    ).replace(/\s+/g, ``),
    upload: {
      ...(config.upload || {}),
      desc: program.desc || ""
    },
    type: program.type || config.type,
    qr: program.qr || config.qr,
  };
  config.dist = getDist(config.projectPath)

  run(config, config.type || "auto-preview");
}
