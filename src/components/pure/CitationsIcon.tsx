import Image from 'next/image';
import styles from './CitationsIcon.module.css';

const CitationsIcon = ({
  articleId,
  className,
}: {
  articleId: string;
  className?: string;
}) => (
  <>
    <a
      href={`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=oJvSC5wAAAAJ&citation_for_view=oJvSC5wAAAAJ:${articleId}`}
      className={`${styles.citations} ${className ?? ''}`}
    >
      <Image
        src={`https://img.shields.io/badge/dynamic/json?label=Google%20Scholar&logo=googlescholar&style=flat&url=https%3A%2F%2Fkaito47802.github.io%2Fdata%2Fscholar.json&query=%24.items%5B%22${articleId}%22%5D.citations&prefix=Cited%20by%20&labelColor=71c0f5&color=9e69cf`}
        alt='Citations'
        fill
      />
    </a>
  </>
);
export default CitationsIcon;
