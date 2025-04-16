import Image from 'next/image';
import styles from './ExternalLinkIcon.module.css';

const ExternalLinkIcon = ({
  text,
  name,
  link,
  color,
  className,
}: {
  text: string;
  name: string;
  link: string;
  color?: string;
  className?: string;
}) => (
  <>
    <a href={link} className={`${styles.poster} ${className ?? ''}`}>
      <Image
        src={`https://img.shields.io/badge/${text}-${name}-${color || 'blue'}.svg`}
        alt='Poster'
        fill
      />
    </a>
  </>
);
export default ExternalLinkIcon;
