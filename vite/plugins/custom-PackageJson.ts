export default function customPackageJson(packageJson) {
  return {
    name: "custom-PackageJson",
    config(config, { command }) {
      // vite的运行配置中注入package.json
      config.PackageJson = packageJson;
    },
  };
}
