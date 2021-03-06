module.exports = {
  projectPath: `D:\\www\\weapp\\demo`, // 项目文件地址，win下需要使用双反斜杠
	compile: {
		pathName: `pages/index/index`, // 自动预览的页面路径
		query: `id=community&mock=123`, // 查询参数
  },
  type: 'upload',
	// build: `yarn build-test:weapp`, // 上传之前需要执行的命令
	upload: {
		version: '1.0.1',
		desc: '测试自动上传，不要乱动',
	},
	// 上传完成后是否自动打开微信开发者后台
	open: false,
	// debounce时间
	time: 50,
	// 生成的二维码图片名，默认为 1.png
	qr: "2.png"
}
