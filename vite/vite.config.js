import { defineConfig } from "vite";
/**
 * vite 8 更换新的插件 @vitejs/plugin-react-swc 为 @vitejs/plugin-react，提供更快的构建速度和更好的性能。
 * 可使用版本 ^6.0.1
 */
import react from "@vitejs/plugin-react";

import appRoot from "app-root-path";


import processPlugins from './plugins/index'



export default defineConfig(async ({ mode, command, isSsrBuild, isPreview }) => {

  return {
    plugins: [
      react(),
      ...processPlugins({ mode, command, isSsrBuild, isPreview })
    ],
    resolve: {
      // 设置路径别名
      alias: {
        "@": appRoot.path + '/core/tools/',
        "src": appRoot.path + '/src/',
        "components": appRoot.path + '/src/components/',
        "core": appRoot.path + '/core/',
      },
    },
    build: {
      outDir: "build", // 指定输出路径
      assetsDir: "static", // 指定生成静态文件目录
      emptyOutDir: true, // 构建时清空该目录
    },
    server: {
      host: "0.0.0.0", //ip地址
      // port: 12580, // 设置服务启动端口号
      strictPort: true, // 若端口已被占用则会直接退出
      https: false, // 启用 TLS + HTTP/2
      open: true, // 设置服务启动时是否自动打开浏览器
      // proxy: { // 配置自定义代理规则
      //   '/api': {
      //     target: 'https://leehaipei.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // },
      // cors: false, // 配置 CORS
    },
  };
});
