export default function handleExtractModuleScriptSrc(html) {
  // 匹配 type="module" 的 script 标签及其 src 属性
  const regex =
    /<script\b[^>]*\btype\s*=\s*["']module["'][^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/i;
  const match = html.match(regex);
  return match ? match[1] : null;
}

// function handleExtractModuleScriptSrc(html) {
//   // 定位 <head> 标签
//   const headStart = html.indexOf("<head>");
//   const headEnd = html.indexOf("</head>", headStart);
//   if (headStart === -1 || headEnd === -1) return null;

//   // 提取 head 内部内容
//   const headContent = html.slice(headStart + 6, headEnd);
//   const scriptTags = headContent.split("</script>");

//   // 遍历所有 script 标签片段
//   for (const tagFragment of scriptTags) {
//     const scriptStart = tagFragment.lastIndexOf("<script");
//     if (scriptStart === -1) continue;

//     const tagContent = tagFragment.slice(scriptStart);
//     // 检查 type="module"
//     if (
//       tagContent.includes('type="module"') ||
//       tagContent.includes("type='module'")
//     ) {
//       // 提取 src 属性
//       const srcMatch = tagContent.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
//       if (srcMatch) return srcMatch[1];
//     }
//   }
//   return null;
// }
