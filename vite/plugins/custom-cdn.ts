import type { PluginOption } from "vite";
import appRoot from "app-root-path";
import fs from "fs-extra";
import cdn from "vite-plugin-cdn-import";

const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);
const useCDN = packageJson.useCDN;

export default function customCDN(): PluginOption {
  if (!useCDN) return null;

  const dependencies = packageJson.dependencies;

  let modules = ["react", "react-dom"];

  // react react-dom react-router antd antd-mobile axios moment dayjs heroui
  const cdnMap = {
    axios: "axios",
    moment: "moment",
    dayjs: "dayjs",
  };

  for (const key in dependencies) {
    if (key === cdnMap?.[key]) {
      modules.push(cdnMap[key]);
    }
  }

  return cdn({ modules });
}

// 启用CDN
// 1. 在package.json中添加useCDN，设置为true
// 2. 安装 vite-plugin-cdn-import 插件 npm i vite-plugin-cdn-import -D

// 常规modules中自定义配置
// {
//   name: "element-plus",
//   var: "ElementPlus",
//   path: "https://unpkg.com/element-plus@2.9.0/dist/index.full.js",
//   // css: "https://unpkg.com/element-plus@2.9.0/dist/index.css",
// }
