/**
 * 16进制色值获取反色设置方法
 * @param  {String} oldColor 为16进制色值的字符串（例：'#000000'）
 * @return {String} 返回反色的色值（例：'#ffffff'）
 */
const colorReverse = (oldColor) => {
  oldColor = "0x" + oldColor.replace(/#/g, "");
  let str = "000000" + (0xffffff - oldColor).toString(16);
  return "#" + str.substring(str.length - 6, str.length);
};

export default colorReverse;
