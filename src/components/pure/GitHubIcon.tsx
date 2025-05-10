import Image from 'next/image';
import styles from './GitHubIcon.module.css';

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
        src={
          withStar
            ? `https://img.shields.io/badge/dynamic/json.svg?label=GitHub&logo=github&style=flat&url=https://api.github.com/repos/${repo}&query=$.stargazers_count&prefix=Stars%20&labelColor=181717`
            : 'https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat'
        }
        alt='GitHub'
        fill
      />
    </a>
  </>
);
export default GitHubIcon;
