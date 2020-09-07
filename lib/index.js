const preview = require("./preview");
const autoPreview = require("./auto-preview");
const upload = require("./upload");
const chalk = require("chalk");
const log = console.log;

const fn = {
  preview,
  upload,
  ['auto-preview']: autoPreview,
};

function run(config, type) {
  if (!fn[type]) {
    throw new Error(`type参数不合法，请确保为preview, auto-preview, upload的一种`);
  }

  log(chalk.green(`本次启动类型为: ${type}`));
  fn[type](config);
}

module.exports = run;
