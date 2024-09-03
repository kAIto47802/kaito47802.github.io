import { useInView } from 'react-intersection-observer';
import styles from './SlideInRight.module.css';

const SlideInRight = ({
  children,
  key,
  className,
}: {
  children: React.ReactNode;
  key?: number;
  className?: string;
}) => {
  const { ref, inView } = useInView({
    // rootMargin: '-20%',
    // triggerOnce: true,
  });
  return (
    <div
      key={key}
      ref={ref}
      className={`${inView ? styles.inView : styles.outView} ${className}`}
    >
      {children}
    </div>
  );
};
export default SlideInRight;
