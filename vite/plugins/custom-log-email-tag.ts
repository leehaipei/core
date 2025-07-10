import appRoot from "app-root-path";
import fs from "fs-extra";

const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);

export default function customLog(): any {
  return {
    name: "custom-log-email-tag",
    transformIndexHtml() {
      return {
        tags: [
          {
            tag: "script",
            attrs: {
              src: `https://static.leehaipei.com/js/log.js?tag=${packageJson.name}`,
              // type: 'module',
              // 'data-version': '1.0' // 自定义属性
            },
            // injectTo: 'head-prepend' // 注入到 <head> 顶部
          },
        ],
      };
    },
  };
}
