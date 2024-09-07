import Image from 'next/image';
import styles from './GitHubIcon.module.css';

const GitHubIcon = ({ link, className }: { link: string; className?: string }) => (
  <>
    <a href={link} className={`${styles.github} ${className ?? ''}`}>
      <Image
        src='https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat'
        alt='GitHub'
        fill
      />
    </a>
  </>
);
export default GitHubIcon;
