import { useInView } from 'react-intersection-observer';
import styles from './SlideInLeft.module.css';

const SlideInLeft = ({
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
export default SlideInLeft;
