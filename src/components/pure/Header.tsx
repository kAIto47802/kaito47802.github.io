import LanguageSwitcher from '@/components/pure/LanguageSwitcher';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <LanguageSwitcher />
  </header>
);
export default Header;
