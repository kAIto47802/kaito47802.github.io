import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <div className={styles.languageSwitcher}>
      <Link
        href='/'
        className={`${styles.langButton} ${locale === 'en' ? styles.active : ''}`}
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        <span>🇺🇸 English</span>
      </Link>
      <Link
        href='/ja'
        className={`${styles.langButton} ${locale === 'ja' ? styles.active : ''}`}
        aria-current={locale === 'ja' ? 'page' : undefined}
      >
        <span>🇯🇵 日本語</span>
      </Link>
    </div>
  );
};
export default LanguageSwitcher;
