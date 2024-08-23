'use client';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';
const Home = () => {
  const { t } = useTranslation();
  return <main className={styles.main}>{t('aaa')}</main>;
};
export default Home;
