import Image from 'next/image';
import styles from './GitHubIcon.module.css';

const createBadgeUrl = (params: Record<string, string>) =>
  `https://img.shields.io/badge/dynamic/json.svg?${new URLSearchParams(params).toString()}`;

const createGitHubBadgeSrc = (repo: string, withStar?: boolean) => {
  // Avoid api.github.com repo lookups at render time because Shields can show "invalid"
  // when the upstream response is unstable or rate-limited.
  if (repo === 'kAIto47802') {
    return createBadgeUrl({
      label: 'GitHub',
      logo: 'github',
      style: 'flat',
      url: 'https://kaito47802.github.io/data/github-stars.json',
      query: '$.totalStars',
      prefix: 'Total Stars ',
      labelColor: '181717',
    });
  }

  if (withStar) {
    return createBadgeUrl({
      label: 'GitHub',
      logo: 'github',
      style: 'flat',
      url: 'https://kaito47802.github.io/data/github-stars.json',
      query: `$.items["${repo}"]`,
      prefix: 'Stars ',
      labelColor: '181717',
    });
  }

  return 'https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat';
};

const GitHubIcon = ({
  repo,
  withStar,
  className,
}: {
  repo: string;
  withStar?: boolean;
  className?: string;
}) => (
  <>
    <a
      href={`https://github.com/${repo}`}
      className={`${styles.github} ${className ?? ''}`}
    >
      <Image
        src={createGitHubBadgeSrc(repo, withStar)}
        alt='GitHub'
        fill
      />
    </a>
  </>
);
export default GitHubIcon;
