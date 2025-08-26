import handleCustomVersionLog from "../../handler/handleCustomVersionLog";

export default function customLogVersion(packageJson: Record<string, any>): any {
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
