import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { AwardsAndHonors as AwardsAndHonorsType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import styles from './AwardsAndHonors.module.css';

interface AwardsAndHonorsProps extends AwardsAndHonorsType {
  index: number;
}

const AwardsAndHonors = ({
  title,
  descriptions,
  yearMonth,
  emphasize,
}: AwardsAndHonorsProps) => (
  <ArrowContent className={styles.awardsAndHonors}>
    {yearMonth && <div className={styles.yearMonth}>{yearMonth}</div>}
    <div className={styles.content}>
      <SlideInLeft className={`${styles.title} ${emphasize ? styles.emph : ''}`}>
        {title}
      </SlideInLeft>
      {descriptions &&
        (descriptions as string[]).map((desc, i) => (
          <SlideInRight key={i} className={styles.description}>
            {desc}
          </SlideInRight>
        ))}
    </div>
  </ArrowContent>
);
export default AwardsAndHonors;
