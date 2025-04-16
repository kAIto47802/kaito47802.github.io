import Image from 'next/image';
import styles from './CvIcon.module.css';

const CvIcon = ({ url, className }: { url: string; className?: string }) => (
  <>
    <a href={url} className={`${styles.link} ${className ?? ''}`}>
      <Image
        src='https://img.shields.io/badge/Download%20CV-5e7bcc.svg?style=flat&logo=readdotcv'
        alt='Scholar'
        fill
      />
    </a>
  </>
);
export default CvIcon;
