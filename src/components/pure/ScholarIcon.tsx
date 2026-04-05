import Image from 'next/image';
import styles from './ScholarIcon.module.css';

const ScholarIcon = ({
  url,
  className,
  withCitations = true,
}: {
  url: string;
  className?: string;
  withCitations: boolean;
}) => (
  <>
    <a href={url} className={`${styles.link} ${className ?? ''}`}>
      <Image
        src={
          withCitations
            ? 'https://img.shields.io/badge/dynamic/json.svg?label=Google%20Scholar&logo=googlescholar&style=flat&url=https://<username>.github.io/<repo>/data/scholar.json&query=$.profile.citations&prefix=Citations%20&color=71c0f5'
            : 'https://img.shields.io/badge/Google%20Scholar-71c0f5.svg?style=flat&logo=googlescholar'
        }
        alt='Scholar'
        fill
      />
    </a>
  </>
);
export default ScholarIcon;
