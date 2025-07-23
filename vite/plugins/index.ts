import type { PluginOption } from "vite";

import projectInfo from "../../tools/projectInfo/index";

import checkCore from "./check-core";
import customLogVersion from "./custom-log-version";
import customBuiltTime from "./custom-built-time";
import customCDN from "./custom-cdn";
import customLogEmailTag from "./custom-log-email-tag";

export default function processPlugins({ mode, command }): PluginOption[] {
  
  const { packageJson, rootPath } = projectInfo;

  let plugins = [checkCore(packageJson, rootPath)];

  if (command === "serve") {
  }

  if (command === "build") {
    plugins = plugins.concat([
      customCDN(packageJson),
      customLogEmailTag(packageJson),
      customBuiltTime(rootPath),
      customLogVersion(packageJson),
    ]);
  }

  return plugins;
}
