import type { PluginOption } from "vite";

import projectInfo from "../../tools/projectInfo/index";

import checkCore from "./check-core";
import customLogVersion from "./custom-log-version";
import customBuiltTime from "./custom-built-time";
import customCDN from "./custom-cdn";
import customLogEmailTag from "./custom-log-email-tag";
import customInitLoading from "./custom-init-loading";

export default function processPlugins({ mode, command }): PluginOption[] {

  const { packageJson, rootPath } = projectInfo;

  let plugins = [] as PluginOption[];

  if (command === "serve") {
    plugins.push(checkCore(packageJson, rootPath));
  }

  if (command === "build") {
    console.log('!!!!!!!!!!!!!!!!!',process.env.WHO_BUILD,'!!!!!!!!!!!!!!!!!');
    
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
