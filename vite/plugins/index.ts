import type { PluginOption } from "vite";

import appRoot from "app-root-path";
import fs from "fs-extra";

import checkCore from "./check-core";
import customLogVersion from "./custom-log-version";
import customBuiltTime from "./custom-built-time";
import customCDN from "./custom-cdn";
import customLogEmailTag from "./custom-log-email-tag";

export default function processPlugins({ mode, command }): PluginOption[] {
  // 处理package.json
  const rootPath = appRoot.path;
  const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
  const packageJson = JSON.parse(packageJsonBuffer);

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
