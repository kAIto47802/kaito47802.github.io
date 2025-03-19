import Image from 'next/image';
import styles from './ScholarIcon.module.css';

const ScholarIcon = ({ url, className }: { url: string; className?: string }) => (
  <>
    <a href={url} className={`${styles.link} ${className ?? ''}`}>
      <Image
        src='https://img.shields.io/badge/Google%20Scholar-71c0f5.svg?style=flat&logo=googlescholar'
        alt='Scholar'
        fill
      />
    </a>
  </>
);
export default ScholarIcon;
