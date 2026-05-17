import { useInView } from 'react-intersection-observer';
import styles from './AnimatedHeader.module.scss';

const AnimatedHeader = ({ text }: { text: string }) => {
  const { ref, inView } = useInView();
  return (
    <h1
      className={`${styles.title} ${inView ? styles.inView : styles.outView}`}
      ref={ref}
    >
      {text.split('').map((t, i) => (
        <span key={i} className={styles.letter}>
          {t}
        </span>
      ))}
      <i className={styles.ornaments} aria-hidden='true'>
        <i className={`${styles.ornament} ${styles.ornamentDiamond}`} />
        <i className={`${styles.ornament} ${styles.ornamentStar}`} />
        <i className={`${styles.ornament} ${styles.ornamentStar}`} />
        <i
          className={`${styles.ornament} ${styles.ornamentDot} ${styles.ornamentBottom}`}
        />
        <i className={`${styles.ornament} ${styles.ornamentDot}`} />
        <i className={`${styles.ornament} ${styles.ornamentDiamond}`} />
        <i
          className={`${styles.ornament} ${styles.ornamentDiamond} ${styles.ornamentBottom}`}
        />
        <i className={`${styles.ornament} ${styles.ornamentStar}`} />
      </i>
    </h1>
  );
};
export default AnimatedHeader;
