import styles from './Heading2.module.css';

const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={styles.heading2}>{children}</h2>;
};
export default Heading2;
