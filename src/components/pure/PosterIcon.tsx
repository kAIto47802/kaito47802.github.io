import Image from 'next/image';
import styles from './PosterIcon.module.css';

const PosterIcon = ({
  text,
  link,
  color,
  className,
}: {
  text: string;
  link: string;
  color?: string;
  className?: string;
}) => (
  <>
    <a href={link} className={`${styles.poster} ${className ?? ''}`}>
      <Image
        src={`https://img.shields.io/badge/${text}-Poster-${color || 'blue'}.svg`}
        alt='Poster'
        fill
      />
    </a>
  </>
);
export default PosterIcon;
