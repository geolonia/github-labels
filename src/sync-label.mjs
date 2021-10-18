import githubLabelSync from "github-label-sync";

export const syncLabel = async (repo, labels) => {
  try {
    const diff = await githubLabelSync({
      repo,
      accessToken: process.env.GITHUB_TOKEN,
      allowAddedLabels: false,
      labels,
    });
    process.stderr.write(`${repo} has been synced.\n`);
    return { repo, diff };
  } catch (error) {
    process.stderr.write(`${repo} failed to be synced.\n`);
    return { repo, error };
  }
};
