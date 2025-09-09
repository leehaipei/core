import hash from '@/hash'
async function generateCanvasFingerprint() {
  // 1. 创建Canvas元素
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 60;
  const ctx = canvas.getContext("2d");

  // 2. 绘制内容 - 精心设计以凸显渲染差异
  ctx.textBaseline = "top"; // 设置文本基线
  ctx.font = "14px Arial, sans-serif"; // 设置字体
  ctx.textBaseline = "alphabetic"; // 再次设置文本基线以增加差异性
  ctx.fillStyle = "#f60"; // 设置填充颜色
  ctx.fillRect(125, 1, 62, 20); // 绘制一个矩形
  ctx.fillStyle = "rgba(0, 0, 200, 0.7)"; // 设置带有透明度的颜色
  ctx.fillText("Hello, Canvas Fingerprint!", 2, 15); // 绘制文本

  // 可以添加更复杂的绘制逻辑，如渐变、阴影、不同形状等，以增加独特性
  // 例如：
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "magenta");
  gradient.addColorStop(1, "cyan");
  ctx.fillStyle = gradient;
  ctx.fillRect(10, 40, 180, 10);

  // 3. 提取图像数据 (Base64字符串)
  const dataUrl = canvas.toDataURL(); // 获取图像数据的Base64编码

  // 4. 计算哈希值 (使用SHA-256算法)
  const hashHex = hash(dataUrl)
  return hashHex; // 这就是计算得到的Canvas指纹哈希值
}

export default generateCanvasFingerprint;
