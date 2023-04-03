# 自定义字体

## 引入字体文件，使用

```css
    /*在css文件中*/   
	@font-face {
            font-family: 'DFSongSd';
            src: url(./afterMin/DFSongSd.ttf);
        }
    /*在css文件中使用*/   
	html,body {
            font-family: 'DFSongSd';
            font-size: 20px;
            text-shadow: none;
        }
```



# 压缩字体文件

## fontmin插件

### 1.启动终端安装`fontmin`插件

```js
npm install fontmin
```

[插件官网]: https://ecomfe.github.io/fontmin/



### 2.新建`fontmin.js`文件，位置随便，最好是根目录便于node启动

```js
var Fontmin = require('fontmin');
//引入插件，当第一步中，使用全局下载的插件，这里路径要注意匹配，否则后面运行时会报找不到模块的错误，
// 所以建议使用第二种：下载到当前项目的依赖中，本文件（fontmin.js）也建在当前项目目录下

var srcPath = './font/DFSongSd.ttf';//需要压缩的字体包的相对位置

var destPath = './afterMin';    //压缩之后字体的输出位置

var text = '哈哈哈你好啊'//需要压缩的内容，设置为''为整个字体包压缩
// 这里是压缩的内容，如果是整个字体包压缩，则不需要设置text，如果是指定内容压缩，则需要设置text；压缩什么写出来什么就会最小化
// 这里压缩完可以使用的文字只有“哈哈哈你好啊”

// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置

// 执行
fontmin.run(function (err, files, stream) {
    if (err) {                  // 异常捕捉
        console.error(err);
    }
    //console.log('done');        // 成功
});
```



### 3.运行`fontmin.js`文件

```js
node fontmin.js
```



### 4.使用压缩后的字体文件

```css
        @font-face {
            font-family: 'DFSongSd';
        /*在css文件中直接引用压缩后的文件*/   
            src: url(./afterMin/DFSongSd.ttf);
        }
        html,
        body {
            font-family: 'DFSongSd';
            font-size: 20px;
            text-shadow: none;
        }
```

也可以直接使用压缩后文件给出的css文件内容



## font-spider插件
https://github.com/allanguys/font-spider-plus
https://github.com/aui/font-spider/blob/master/README-ZH-CN.md