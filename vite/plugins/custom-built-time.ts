import handleWriteBuiltTime from '../../handler/handleWriteBuiltTime'

export default function customBuiltTime(rootPath: string) {

  let start = 0;

  return {
    name: "custom-built-time",
    config() {
      start = new Date().getTime();
    },
    async closeBundle() {
      const total = `${(new Date().getTime() - start) / 1000}s`;
      await handleWriteBuiltTime(total, rootPath);
    },
  };
}
