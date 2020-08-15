import { listRepos } from "./list-repos.mjs";
import { readYamlSync } from "./read-yaml.mjs";
import { syncLabel } from "./sync-label.mjs";
import pThrottle from "p-throttle";

const main = async () => {
  const org = process.env.GITHUB_ORGANIZATION;
  if (!org) {
    process.stdout.write(
      "Please specify GITHUB_ORGANIZATION environmental variable."
    );
    process.exit(1);
  }

  const repos = await listRepos(org);
  const labels = readYamlSync();

  const throttled = pThrottle((repo) => syncLabel(repo, labels), 5, 2000);
  const result = await Promise.all(repos.map((repo) => throttled(repo)));

  process.stdout.write(JSON.stringify(result, null, 2));
};

main();
