import handleCustomVersionLog from "../../handler/handleCustomVersionLog";

export default function customLogVersion(): any {
  return {
    name: "custom-log-version",
   async transformIndexHtml() {
      return {
        tags: [
          {
            tag: "script",
            children: await handleCustomVersionLog(),
            injectTo: 'body'
          },
        ],
      };
    },
  };
}
