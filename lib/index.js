const preview = require("./preview");
const chalk = require("chalk");
const log = console.log;

const fn = {
  preview
};

function run(config, type) {
  if (!fn[type]) {
    throw new Error(`type参数不合法，请确保为preview, upload的一种`);
  }
  
  log(chalk.green(`本次启动类型为: ${type}`))
  fn[type](config);
}

module.exports = run;
