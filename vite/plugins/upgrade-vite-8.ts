import type { PluginOption } from "vite";
import chalk from "chalk";
import fs from 'fs-extra';

export default function upgradeVite8(packageJson: Record<string, any>, rootPath: string): PluginOption {

  return {
    name: "upgrade-vite-8",
    async configureServer(server) {

      const viteVersion = packageJson.devDependencies.vite;

      const isGte8 = isVersionGte8(viteVersion);

      if (!isGte8) {


        console.log(chalk.red(`❌ 当前 Vite 版本 ${viteVersion}，需要升级到 v8 或更高版本。`));
        console.log(chalk.green("开始更新文件..."));

        try {

          // 1.更新package.json文件
          // devDependencies
          packageJson.devDependencies["vite"] = "^8.0.8";
          packageJson.devDependencies["typescript"] = "^6.0.3";
          packageJson.devDependencies["sass-embedded"] = "^1.99.0";
          packageJson.devDependencies["@vitejs/plugin-react"] = "^6.0.1";
          packageJson.devDependencies["@types/react-dom"] = "^19.2.3";
          packageJson.devDependencies["@types/react"] = "^19.2.14";
          delete packageJson.devDependencies["@vitejs/plugin-react-swc"];

          // dependencies
          packageJson.dependencies["react-dom"] = "^19.2.5";
          packageJson.dependencies["react"] = "^19.2.5";

          // engines
          packageJson.engines = {
            "node": ">=18"
          };

          const packageJsonPath = rootPath + "/package.json";
          const packageJsonContent = JSON.stringify(packageJson, null, "\t");

          const packageJsonUpdated = await updateFiles(packageJsonPath, packageJsonContent);

          if (packageJsonUpdated) {
            console.log(chalk.green("package.json 文件更新完成！"));
          }


          // 2.增加.npmrc文件
          const npmrcContent = `engine-strict=true`;
          const npmrcPath = rootPath + "/.npmrc";

          const npmrcUpdated = await updateFiles(npmrcPath, npmrcContent);

          if (npmrcUpdated) {
            console.log(chalk.green(".npmrc 文件创建完成！"));
          }

          // 3.增加.nvmrc文件
          const nvmrcContent = "22.15.0";
          const nvmrcPath = rootPath + "/.nvmrc";
          const nvmrcUpdated = await updateFiles(nvmrcPath, nvmrcContent);

          if (nvmrcUpdated) {
            console.log(chalk.green(".nvmrc 文件创建完成！"));
          }

          // 5.更新.vscode\settings.json文件
          const vscodeSettingsPath = rootPath + "/.vscode/settings.json";
          const vscodeSettings = {
            "explorer.fileNesting.enabled": true,
            "explorer.fileNesting.patterns": {
              "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .prettier*, prettier*, .editorconfig, .nvmrc, .npmrc, .gitignore, postcss.config.js, tailwind.config.js, logo.psd, buildtime.json, release-record.json, tsconfig.json"
            }
          }
          const vscodeSettingsContent = JSON.stringify(vscodeSettings, null, "\t");

          const vscodeSettingsUpdated = await updateFiles(vscodeSettingsPath, vscodeSettingsContent);

          if (vscodeSettingsUpdated) {
            console.log(chalk.green(".vscode/settings.json 文件更新完成！"));
          }

          // 4.更新tsconfig.json文件
          const tsconfigPath = rootPath + "/tsconfig.json";
          const tsconfig = {
            "compilerOptions": {
              "target": "ESNext",
              "useDefineForClassFields": true,
              "lib": ["DOM", "DOM.Iterable", "ESNext"],
              "allowJs": true,
              "skipLibCheck": true,
              "esModuleInterop": true,
              "allowSyntheticDefaultImports": true,
              "strict": true,
              "forceConsistentCasingInFileNames": true,
              "module": "ESNext",
              "moduleResolution": "Bundler",
              "resolveJsonModule": true,
              "isolatedModules": true,
              "noEmit": true,
              "jsx": "react-jsx",
              "paths": {
                "@/*": ["./core/tools/*"],
                "src/*": ["./src/*"],
                "components/*": ["./src/components/*"],
                "core/*": ["./core/*"]
              }
            },
            "include": [
              "src/**/*.ts",
              "src/**/*.d.ts",
              "src/**/*.tsx",
              "src/**/*.js",
              "src/**/*.jsx"
            ],
            "exclude": ["node_modules", "core"]
          }
          const tsconfigContent = JSON.stringify(tsconfig, null, "\t");
          const tsconfigUpdated = await updateFiles(tsconfigPath, tsconfigContent);
          if (tsconfigUpdated) {
            console.log(chalk.green("tsconfig.json 文件更新完成！"));
          }



        } catch (error) {
          console.log(error);

        }


        console.log(chalk.green("所有文件更新完成！"));


        const err = new Error(`请移除 node_modules 目录，然后重新安装依赖。`);
        err.stack = '';
        throw err;

      }
    }
  };
}


function updateFiles(path: string, content: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.writeFile(path, content, (err: any) => {
      if (err) {
        console.log(err);
        reject(false);
      } else {
        resolve(true)
      }
    })

  });
}


function isVersionGte8(versionStr: string): boolean {
  if (!versionStr) return false;
  // 去掉版本前面的 ^ ~ > = 等符号
  const cleanVersion = versionStr.replace(/[^0-9.]/g, '');
  const major = Number(cleanVersion.split('.')[0]);
  return major >= 8;
}