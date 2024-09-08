import { useInView } from 'react-intersection-observer';
import styles from './SlideInRight.module.css';

const SlideInRight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${inView ? styles.inView : styles.outView} ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
export default SlideInRight;
