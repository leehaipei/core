import appRoot from "app-root-path";
import fs from "fs-extra";

const rootPath = appRoot.path;
const packageJsonBuffer = fs.readFileSync(rootPath + "/package.json");
const packageJson = JSON.parse(packageJsonBuffer);

export default { packageJson, rootPath };
