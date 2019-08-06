module.exports = {
  cli: "D:/soft/微信web开发者工具", // cli文件所在的目录
  projectpath: `D:/www/heywoof-app-frontend`, // 项目地址
  compile: {
    pathName: `pages/home/index`, // 自动预览的页面路径
    query: `` // 查询参数，微信目前有BUG，只能识别一个参数
  },
  build: `yarn build-test:weapp`, // 上传之前需要执行的命令
  upload: {
    version: "1.0.1",
    desc: "热区 上传测试"
  }
};
