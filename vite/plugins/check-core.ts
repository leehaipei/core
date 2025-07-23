import type { PluginOption } from "vite";
import chalk from "chalk";
import shell from "shelljs";
import axios from "axios";

import initCore from "../../../init-core";

export default function checkCorePlugin(packageJson, rootPath): PluginOption {

  const coreBranch = packageJson.coreGitBranch;

  // 持久化检查状态（模块作用域）
  let checkCompleted = false;
  return {
    name: "check-core",
    // 拦截配置解析阶段（异步阻塞）
    async config(config, env) {
      // 仅且首次执行
      if (!checkCompleted) {
        try {
          // 判断本地的仓库是否最新，不是最新才进行更新
          const gitInfo = await axios.get(
            `https://api.github.com/repos/leehaipei/core/branches/${coreBranch}`
          );
          if (gitInfo?.data?.commit?.sha) {
            const remoteSHA: string = gitInfo.data.commit.sha.trim();
            shell.cd(rootPath + "/core");
            const result = shell.exec(`git rev-parse ${coreBranch}`);
            const currentSHA: string = result.stdout.trim();
            shell.cd(rootPath);
            if (remoteSHA === currentSHA) {
              console.log(
                chalk.green("Core is already the latest, no need to update.")
              );
            } else {
              chalk.green("Core needs to be updated!");
              const checkCoreResult = await initCore();
              console.log(chalk.green(checkCoreResult));
            }
          } else {
            const checkCoreResult = await initCore();
            console.log(chalk.red("Error to fetch Core Git information!"));
            console.log(chalk.green(checkCoreResult));
          }
        } catch (error) {
          const checkCoreResult = await initCore();
          console.log(chalk.red("Failed to fetch Core Git information!"));
          console.log(chalk.green(checkCoreResult));
        }

        checkCompleted = true;
      }
      return null; // 不需要修改配置
    },
  };
}
