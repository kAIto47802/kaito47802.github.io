import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const githubRepos = [
  'sarulab-speech/UTMOSv2',
  'kAIto47802/Prover-Agent',
  'kAIto47802/notist',
  'kAIto47802/condPED-ANOVA',
  'kAIto47802/kAIto47802',
  'kAIto47802/kaito47802.github.io',
] as const;

type GithubStarsJson = {
  updatedAt: string;
  totalStars: number;
  items: Record<string, number>;
};

const fetchRepoStars = async (repo: string): Promise<number> => {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'kaito47802.github.io',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${repo}`);
  }

  const json = (await response.json()) as { stargazers_count?: number };

  if (typeof json.stargazers_count !== 'number') {
    throw new Error(`stargazers_count not found for ${repo}`);
  }

  return json.stargazers_count;
};

const main = async () => {
  const outputPath = process.env.OUTPUT_PATH ?? 'public/data/github-stars.json';

  const entries = await Promise.all(
    githubRepos.map(async (repo) => [repo, await fetchRepoStars(repo)] as const),
  );

  const items = Object.fromEntries(entries);
  const totalStars = Object.values(items).reduce((sum, stars) => sum + stars, 0);

  const payload: GithubStarsJson = {
    updatedAt: new Date().toISOString(),
    totalStars,
    items,
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${outputPath}`);
  console.log(JSON.stringify(payload, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
