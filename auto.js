module.exports = {
	cli: `D:/soft/微信web开发者工具`, // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
  projectpath: `D:\\www\\saas-fe-xapp-ec`, // 项目文件地址
	compile: {
		pathName: `pages/goods/newDetail`, // 自动预览的页面路径
		query: `id=3556920137`, // 查询参数，微信目前有BUG，只能识别一个参数
  },
  type: 'auto-preview',
	// build: `yarn build-test:weapp`, // 上传之前需要执行的命令
	upload: {
		version: '1.0.1',
		desc: '测试自动上传，不要乱动',
	},
}
