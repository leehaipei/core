export default function customPackageJson(packageJson: Record<string, any>) {
  return {
    name: "custom-PackageJson",
    config(config, { command }) {
      // vite的运行配置中注入package.json
      config.PackageJson = packageJson;
    },
  };
}
