import hash from '@/hash'
async function generateWebAudioFingerprint() {
  const sampleRate = 44100;
  const duration = 1; // 秒
  const context = new (window.OfflineAudioContext ||
    window.webkitOfflineAudioContext)(1, duration * sampleRate, sampleRate);

  const oscillator = context.createOscillator();
  oscillator.type = "triangle"; // 使用三角波
  oscillator.frequency.setValueAtTime(10000, context.currentTime); // 设置频率

  const compressor = context.createDynamicsCompressor();
  // 设置压缩器参数以凸显设备差异
  compressor.threshold.setValueAtTime(-50, context.currentTime);
  compressor.knee.setValueAtTime(40, context.currentTime);
  compressor.ratio.setValueAtTime(12, context.currentTime);
  compressor.attack.setValueAtTime(0, context.currentTime);
  compressor.release.setValueAtTime(0.25, context.currentTime);

  oscillator.connect(compressor);
  compressor.connect(context.destination);

  oscillator.start(0);
  context.startRendering();

  return new Promise((resolve, reject) => {
    context.oncomplete = function (event) {
      const renderedBuffer = event.renderedBuffer;
      const channelData = renderedBuffer.getChannelData(0); // 获取第一个通道的数据

      // 计算指纹：例如，对特定区间（如4500到5000）的数据求绝对值之和
      let fingerprintValue = 0;
      for (let i = 4500; i < 5000; i++) {
        fingerprintValue += Math.abs(channelData[i]);
      }
      fingerprintValue = fingerprintValue.toFixed(8);
      fingerprintValue = fingerprintValue.toString();
      resolve(hash(fingerprintValue));
    };
  });
}

export default generateWebAudioFingerprint;
