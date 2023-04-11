/** * 获取文本px宽度* @param font{String}: 字体样式**/

String.prototype.pxWidth = function (font) {
    // re-use canvas object for better performance
    let canvas = String.prototype.pxWidth.canvas || (String.prototype.pxWidth.canvas = document.createElement('canvas')),
        context = canvas.getContext('2d');

    font && (context.font = font);
    let metrics = context.measureText(this);

    return metrics.width;
};

  // let w = 'Simplemode'.pxWidth('14px -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif');
  // let w1 = '...'.pxWidth('14px sans-serif');
  // console.log(8989, w1);