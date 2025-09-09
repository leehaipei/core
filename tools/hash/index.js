async function hash(dataStr) {
  const encoder = new TextEncoder();
  const data = encoder.encode(dataStr);
  // 使用Web Crypto API进行哈希计算
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // 将哈希值转换为十六进制字符串
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export default hash;
