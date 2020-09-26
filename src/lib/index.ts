import { preview } from './preview'
import { autoPreivew } from './auto-preview'
import chalk from 'chalk'
import { upload } from './upload';
const log = console.log;

const fn = {
  preview,
  upload,
  ['auto-preview']: autoPreivew,
};

export function run(config, type) {
  if (!fn[type]) {
    log(chalk.red(`type参数不合法，当前为${type}, 请确保为preview, auto-preview, upload的一种`));
  }

  log(chalk.whiteBright(`本次启动类型为: ${type}`));
  fn[type](config);
}


