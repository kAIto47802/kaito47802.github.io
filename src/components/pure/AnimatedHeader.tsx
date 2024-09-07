import { useInView } from 'react-intersection-observer';
import styles from './AnimatedHeader.module.css';

const AnimatedHeader = ({ text }: { text: string }) => {
  const { ref, inView } = useInView();
  return (
    <h1
      className={`${styles.title} ${inView ? styles.inView : styles.outView}`}
      ref={ref}
    >
      {text.split('').map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </h1>
  );
};
export default AnimatedHeader;
