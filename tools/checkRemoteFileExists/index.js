async function checkRemoteFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (response.ok) {
      return true; // 状态码 2xx（如 200）表示文件存在
    } else {
      return false; // 状态码 4xx/5xx 表示文件不存在或服务器错误
    }
  } catch (error) {
    console.error("checkRemoteFileExists error", error);
    return false; // 网络错误或跨域问题
  }
}

export default checkRemoteFileExists;

// 检查一个网络资源是否存在
// 使用方法
// checkRemoteFileExists('https://example.com/file.txt').then(exists => {
//   if (exists) {
//     console.log('文件存在');
//   } else {
//     console.log('文件不存在');
//   }
// });
