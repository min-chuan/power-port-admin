export default function generateId() {
  const timestamp = Date.now().toString(36); // 将时间戳转换为36进制字符串
  const random = Math.random().toString(36).substring(2, 7); // 生成随机字符串
  return timestamp + '-' + random;
}
