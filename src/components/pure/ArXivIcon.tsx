import Image from 'next/image';
import styles from './ArXivIcon.module.css';

const ArXivIcon = ({ num, className }: { num: string; className?: string }) => (
  <>
    <a
      href={`http://arxiv.org/abs/${num}`}
      className={`${styles.arxiv} ${className ?? ''}`}
    >
      <Image
        src={`https://img.shields.io/badge/arXiv-${num}-b31b1b.svg`}
        alt='arXiv'
        fill
      />
    </a>
  </>
);
export default ArXivIcon;
