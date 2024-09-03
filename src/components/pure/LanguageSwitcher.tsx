import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button onClick={() => changeLanguage('en')} className={styles.langButton}>
        <span>🇺🇸 English</span>
      </button>
      <button onClick={() => changeLanguage('ja')} className={styles.langButton}>
        <span>🇯🇵 日本語</span>
      </button>
    </div>
  );
};
export default LanguageSwitcher;
