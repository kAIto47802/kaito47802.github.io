import { useInView } from 'react-intersection-observer';
import styles from './TypeWriter.module.scss';

const TypeWriter = ({ text, className }: { text: string; className?: string }) => {
  const { ref, inView } = useInView();
  const num = text.length;
  return (
    <div
      ref={ref}
      className={`${styles.typeText} ${styles[`count-${num}`]} ${inView ? styles.inView : styles.outView} ${className ?? ''}`}
    >
      {text.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </div>
  );
};
export default TypeWriter;
