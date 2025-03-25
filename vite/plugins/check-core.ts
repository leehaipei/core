import type { PluginOption } from "vite";
import chalk from "chalk";


import initCore from "../../../init-core";

export default function checkCorePlugin(): PluginOption {
  // 持久化检查状态（模块作用域）
  let checkCompleted = false;
  return {
    name: "check-core",
    // 拦截配置解析阶段（异步阻塞）
    async config(config, env) {
      // 仅且首次执行
      if (!checkCompleted) {
        // await initCore(true); // 不删除core文件夹，可以传入true，开发使用
        const checkCoreResult = await initCore();
        console.log(chalk.green(checkCoreResult));
        checkCompleted = true;
      }
      return null; // 不需要修改配置
    },
  };
}
