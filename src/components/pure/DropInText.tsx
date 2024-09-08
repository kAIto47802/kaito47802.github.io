import { useInView } from 'react-intersection-observer';
import styles from './DropInText.module.scss';

const DropInText = ({
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
      className={`${styles.dropInText} ${inView ? styles.inView : styles.outView} ${className ?? ''}`}
    >
      {text.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </div>
  );
};
export default DropInText;
