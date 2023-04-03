# 压缩&混淆js文件



## 使用插件 uglify-js

[uglify-js github主页](https://github.com/mishoo/UglifyJS)

[uglify-js中文文档链接](https://github.com/LiPinghai/UglifyJSDocCN/blob/master/README.md)



### 直接使用 uglify-js

1. 全局安装 uglify-js 插件

   `npm install uglify-js -g`

2. 执行命令

   `uglifyjs text.js --output text-min.js --compress --mangle --timings`



### 加载使用 uglify-js

```javascript
var UglifyJS = require("uglify-js");
```

[使用介绍](https://github.com/LiPinghai/UglifyJSDocCN/blob/master/README.md#api-reference)



## 使用残暴插件JavaScript Obfuscator Tool

[github 主页](https://github.com/javascript-obfuscator/javascript-obfuscator)



### 直接在网页使用

[JavaScript Obfuscator Tool](https://obfuscator.io/)



### 加载使用

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator');
```