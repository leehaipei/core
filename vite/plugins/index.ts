import type { PluginOption } from "vite";

import checkCore from "./check-core";
import customLogVersion from "./custom-log-version";
import customBuiltTime from "./custom-built-time";
import customCDN from "./custom-cdn";
import customLogEmailTag from "./custom-log-email-tag";

export default function processPlugins({ mode, command }): PluginOption[] {
  let plugins = [checkCore()];

  if (command === "serve") {
  }

  if (command === "build") {
    plugins = plugins.concat([
      customCDN(),
      customLogEmailTag(),
      customBuiltTime(),
      customLogVersion(),
    ]);
  }

  return plugins;
}
