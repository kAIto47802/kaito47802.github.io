import Image from 'next/image';
import styles from './LinkedInIcon.module.css';

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M5.37 24H.4V7.98h4.97zM2.88 5.8A2.9 2.9 0 1 1 2.9 0a2.9 2.9 0 0 1-.02 5.8zM24 24h-4.96v-7.8c0-1.86-.04-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.12V24H8.5V7.98h4.76v2.19h.07c.66-1.26 2.28-2.59 4.7-2.59 5.03 0 5.96 3.31 5.96 7.61z"/></svg>`;
const badgeUrl = `https://img.shields.io/badge/LinkedIn-0A66C2.svg?${new URLSearchParams({
  style: 'flat',
  logo: `data:image/svg+xml;base64,${btoa(logo)}`,
}).toString()}`;

const LinkedInIcon = ({ url, className }: { url: string; className?: string }) => (
  <a href={url} className={`${styles.link} ${className ?? ''}`}>
    <Image src={badgeUrl} alt='LinkedIn' fill />
  </a>
);

export default LinkedInIcon;
