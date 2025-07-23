import type { PluginOption } from "vite";
import cdn from "vite-plugin-cdn-import";

export default function customCDN(packageJson): PluginOption {

  const useCDN = packageJson.useCDN;

  if (!useCDN) return null;

  const dependencies = packageJson.dependencies;

  interface Module {
    name: string;
    var: string;
    path: string | string[];
    /** Alias ​​of name, for example "react-dom/client" is an alias of "react-dom" */
    alias?: string[];
    css?: string | string[];
    prodUrl?: string;
  }

  let modules: Module[] = [];

  // react react-dom react-router antd antd-mobile axios moment dayjs heroui
  const cdnMap = {
    axios: {
      name: "axios",
      var: "axios",
      path: `axios.min.js`,
    },
    moment: {
      name: "moment",
      var: "moment",
      path: `https://cdnjs.cloudflare.com/ajax/libs/moment.js/{version}/moment.min.js`,
    },
    dayjs: {
      name: "dayjs",
      var: "dayjs",
      path: [`dayjs.min.js`, `locale/zh-cn.min.js`],
    },
  };

  for (const key in dependencies) {
    if (cdnMap?.[key]) {
      modules.push(cdnMap[key]);
    }
  }

  return cdn({
    modules,
    prodUrl: "https://cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path}", // https://cdnjs.com
  });
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
