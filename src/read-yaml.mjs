import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readYamlSync = () => {
  const { default: { labels } } = YAML.parse(
    fs
      .readFileSync(path.resolve(__dirname, "..", "labels.yml"))
      .toString("utf-8")
  );
  return labels;
};
