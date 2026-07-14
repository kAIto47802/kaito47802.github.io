import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const localePaths = ['src/i18n/locales/en.json', 'src/i18n/locales/ja.json'] as const;

const extraGithubRepos = [
  'kAIto47802/notist',
  'kAIto47802/kAIto47802',
  'kAIto47802/kaito47802.github.io',
] as const;

type GithubStarsJson = {
  updatedAt: string;
  totalStars: number;
  items: Record<string, number>;
};

const collectRepos = (value: unknown, repos: Set<string>) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectRepos(item, repos));
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key === 'repo' && typeof nestedValue === 'string') {
      repos.add(nestedValue);
    }
    collectRepos(nestedValue, repos);
  }
};

const loadGithubRepos = async (): Promise<string[]> => {
  const repos = new Set<string>(extraGithubRepos);

  for (const localePath of localePaths) {
    const locale = JSON.parse(await readFile(localePath, 'utf8')) as unknown;
    collectRepos(locale, repos);
  }

  return [...repos].sort();
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
  const githubRepos = await loadGithubRepos();

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
