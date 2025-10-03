import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { AcademicService as AcademicServiceType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import styles from './AcademicService.module.css';

interface AcademicServiceProps extends AcademicServiceType {
  index: number;
}

const AwardsAndHonors = ({ title, descriptions }: AcademicServiceProps) => (
  <ArrowContent className={styles.academicService}>
    <div className={styles.content}>
      <SlideInLeft className={styles.title}>{title}</SlideInLeft>
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
