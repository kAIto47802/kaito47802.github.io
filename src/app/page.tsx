'use client';
import { Noticia_Text } from 'next/font/google';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';

import nextConfig from '../../next.config.mjs';
const BASE_PATH = nextConfig.basePath || '';

const noticia = Noticia_Text({ weight: '400', style: 'italic', subsets: ['latin'] });

const Home = () => {
  const { t } = useTranslation();
  return (
    <main className={styles.main}>
      <div className={styles.basic}>
        <Image
          src={`${BASE_PATH}/icon.jpg`}
          alt='icon'
          width={200}
          height={200}
          style={{ borderRadius: '50%' }}
        />
        <div className={styles.basicText}>
          <div className={`${styles.name} ${noticia.className}`}>kAIto47802</div>
          <div className={styles.affiliation}>{t('basic.affiliation')}</div>
        </div>
      </div>
    </main>
  );
};
export default Home;
