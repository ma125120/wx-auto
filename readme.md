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
wxauto
或者
wxauto -t preview -c auto.js
```

## 参数(均有默认值)
```javascript
-t, --type 预览类型，目前只支持preview
-c, --config 配置文件名，默认值为auto.js
```
文件路径为相对路径，相对于执行命令时所在的路径