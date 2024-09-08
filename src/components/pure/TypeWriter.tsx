import { useInView } from 'react-intersection-observer';
import styles from './TypeWriter.module.scss';

const TypeWriter = ({ text, className }: { text: string; className?: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const num = text.length;
  return (
    <div
      ref={ref}
      className={`${styles.typeText} ${styles[`count-${num}`]} ${inView ? styles.inView : styles.outView} ${className ?? ''}`}
    >
      {text.split('').map((char, index) => (
        <span key={index} className={styles.char}>
          {char}
        </span>
      ))}
    </div>
  );
};
export default TypeWriter;
