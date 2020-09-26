module.exports = {
  projectPath: `D:\\www\\weapp\\test_weapp`, // 项目文件地址，win下需要使用双反斜杠
	compile: {
		pathName: `pages/index/index`, // 自动预览的页面路径
		query: `id=3556920137`, // 查询参数
  },
  type: 'auto-preview',
	// build: `yarn build-test:weapp`, // 上传之前需要执行的命令
	upload: {
		version: '1.0.1',
		desc: '测试自动上传，不要乱动',
	},
	// debounce时间
	time: 50,
}
