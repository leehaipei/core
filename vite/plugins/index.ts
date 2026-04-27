import type { PluginOption } from "vite";

import projectInfo from "../../tools/projectInfo/index";

import checkCore from "./check-core";
import customLogVersion from "./custom-log-version";
import customBuiltTime from "./custom-built-time";
import customCDN from "./custom-cdn";
import customLogEmailTag from "./custom-log-email-tag";
import customInitLoading from "./custom-init-loading";

import upgradeVite8 from "./upgrade-vite-8";

export default function processPlugins({
  mode,
  command,
  isSsrBuild,
  isPreview,
}): PluginOption[] {
  const { packageJson, rootPath } = projectInfo;

  let plugins = [] as PluginOption[];

  // vite8升级提示插件
  plugins.push(upgradeVite8(packageJson, rootPath));

  if (command === "serve") {
    if (!isPreview) {
      plugins.push(checkCore(packageJson, rootPath));
    }
  }

  if (command === "build") {
    if (process.env.WHO_BUILD !== "github") {
      plugins.push(checkCore(packageJson, rootPath));
    }

    plugins = plugins.concat([
      customInitLoading(),
      customCDN(packageJson),
      customLogEmailTag(packageJson),
      customBuiltTime(rootPath),
      customLogVersion(packageJson),
    ]);
  }

  return plugins;
}
