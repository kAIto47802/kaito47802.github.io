import { useInView } from 'react-intersection-observer';
import style from './OpeningAnimation.module.css';

const OpeningAnimation = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`${style.container} ${inView ? style.inView : style.outView}`}
    ></div>
  );
};
export default OpeningAnimation;
