import handleCustomVersionLog from "../../handler/handleCustomVersionLog";

export default function customLogVersion(packageJson): any {
  return {
    name: "custom-log-version",
    async transformIndexHtml() {
      return {
        tags: [
          {
            tag: "script",
            children: await handleCustomVersionLog(packageJson),
            injectTo: "body",
          },
        ],
      };
    },
  };
}
