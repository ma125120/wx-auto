# wx-auto

微信开发者工具，HTTP调用，自动预览，提高工作效率

## 局部安装

```javascript
npm i wx-auto -D 或者 yarn add wx-auto -D
```

## 全局安装

```javascript
npm i wx-auto -g 
```

## 使用方法
```javascript
npx wxauto
或者
npx wxauto -t preview -c auto.js
```

## 注意事项
需要事先在微信开发者工具中打开HTTP端口：
```
微信开发者工具 -> 查看所有项目 -> 设置 -> 安全，里面有个服务端口，打开就有了
```

## 参数(均有默认值)
```javascript
-t, --type 类型，目前支持auto-preview, preview 和 upload
-c, --config 配置文件名，默认值为auto.js
```
文件路径为相对路径，相对于执行命令时所在的路径

## 配置文件 auto.js
```javascript
{
  cli: "D:/soft/微信web开发者工具", // cli文件所在的目录
  projectpath: `D:/www/react/heywoof-app-frontend`, // 项目地址
  compile: {
    pathName: `pages/scene/index`, // 自动预览的页面路径
    query: `activityId=5d45050569515b000c5b740a` // 查询参数，微信目前有BUG，只能识别一个参数
  },
  // build: `yarn build-test:weapp`, // 上传之前需要执行的命令
  upload: {
    version: "1.0.1",
    desc: "测试自动上传，不要乱动"
  }
};
```

