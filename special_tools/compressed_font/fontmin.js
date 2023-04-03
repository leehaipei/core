var Fontmin = require('fontmin');
//引入插件，当第一步中，使用全局下载的插件，这里路径要注意匹配，否则后面运行时会报找不到模块的错误，
// 所以建议使用第二种：下载到当前项目的依赖中，本文件（fontmin.js）也建在当前项目目录下

var srcPath = './font/DFSongSd.ttf';//需要压缩的字体包的相对位置

var destPath = './afterMin';    //压缩之后字体的输出位置

var text = '中文'//需要压缩的内容，设置为''为整个字体包压缩
// 这里是压缩的内容，如果是整个字体包压缩，则不需要设置text，如果是指定内容压缩，则需要设置text；压缩什么写出来什么就会最小化

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