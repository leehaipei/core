import hash from '@/hash'

async function getWebGLInfo() {
  // 1. 创建Canvas元素
  const canvas = document.createElement("canvas");
  // 尝试获取WebGL上下文，兼容不同浏览器和版本
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  // 检查浏览器是否支持WebGL
  if (!gl) {
    console.error("您的浏览器不支持WebGL");
    return null;
  }

  // 2. 获取WEBGL_debug_renderer_info扩展
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (!debugInfo) {
    console.warn(
      "未能获取WEBGL_debug_renderer_info扩展。这可能是由于浏览器隐私设置（如Firefox的privacy.resistFingerprinting）或扩展本身不被支持。"
    );
    return null;
  }

  // 3. 使用扩展中的常量获取厂商(vendor)和渲染器(renderer)信息
  try {
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    // 返回获取到的信息
    return {
      vendor: await hash(vendor) || "Unknown",
      renderer: await hash(renderer) || "Unknown",
    };
  } catch (error) {
    console.error("在获取WebGL参数时发生错误:", error);
    return null;
  } finally {
    // 清理：从DOM中移除创建的canvas元素（如果添加了的话）
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
}

export default getWebGLInfo;
