import type { PluginOption } from "vite";

import handleCustomLog from "../../handler/handleCustomLog";

export default function customLog(): PluginOption {
  return {
    name: "custom-log",
    async config() {
      await handleCustomLog(true);
    },
    async closeBundle() {
      await handleCustomLog(false);
    },
  };
}
