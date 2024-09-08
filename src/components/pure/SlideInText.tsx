import { useInView } from 'react-intersection-observer';
import styles from './SlideInText.module.scss';

const SlideInText = ({
  text,
  triggerOnce = false,
  className,
}: {
  text: string;
  triggerOnce: boolean;
  className?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce });
  return (
    <div
      ref={ref}
      className={`${styles.slidingText} ${inView ? styles.inView : styles.outView} ${className ?? ''}`}
    >
      {text.split('').map((char, index) => (
        <span key={index} className={styles.char}>
          <span className={styles.charText}>{char}</span>
        </span>
      ))}
    </div>
  );
};
export default SlideInText;
