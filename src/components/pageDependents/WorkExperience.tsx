import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { WorkExperience as WorkExperienceType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import styles from './WorkExperience.module.css';

interface WorkExperienceProps extends WorkExperienceType {
  index: number;
}

const WorkExperience = ({
  index,
  company,
  position,
  period,
  descriptions,
}: WorkExperienceProps) => (
  <ArrowContent className={styles.workExperience}>
    <div className={styles.period}>
      <span>{period.start}</span>
      <br />
      <span>–{period.end}</span>
    </div>
    <div className={styles.content}>
      {index % 2 ? (
        <SlideInLeft className={styles.company}>{company}</SlideInLeft>
      ) : (
        <SlideInRight className={styles.company}>{company}</SlideInRight>
      )}
      {index % 2 ? (
        <>
          <SlideInRight className={styles.position}>{position}</SlideInRight>
          <SlideInRight className={styles.periodInner}>
            {period.start}–{period.end}
          </SlideInRight>
        </>
      ) : (
        <>
          <SlideInLeft className={styles.position}>{position}</SlideInLeft>
          <SlideInLeft className={styles.periodInner}>
            {period.start}–{period.end}
          </SlideInLeft>
        </>
      )}
      {descriptions &&
        descriptions.map((desc, i) =>
          index % 2 ? (
            <SlideInLeft key={i} className={styles.description}>
              {desc}
            </SlideInLeft>
          ) : (
            <SlideInRight key={i} className={styles.description}>
              {desc}
            </SlideInRight>
          ),
        )}
    </div>
  </ArrowContent>
);
export default WorkExperience;
