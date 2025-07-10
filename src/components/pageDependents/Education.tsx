import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { Education as EducationType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import styles from './Education.module.css';

interface EducationProps extends EducationType {
  index: number;
}

const Education = ({
  index,
  institution,
  department,
  degree,
  period,
  notes,
}: EducationProps) => (
  <ArrowContent className={styles.education}>
    <div className={styles.period}>
      <span>{period.start}</span>
      <br />
      <span>–{period.end}</span>
    </div>
    <div className={styles.content}>
      {index % 2 ? (
        <SlideInLeft className={styles.institution}>{institution}</SlideInLeft>
      ) : (
        <SlideInRight className={styles.institution}>{institution}</SlideInRight>
      )}
      {index % 2 ? (
        <>
          {department && (
            <SlideInRight className={styles.department}>{department}</SlideInRight>
          )}
          <SlideInRight className={styles.department}>{degree}</SlideInRight>
          <SlideInLeft className={styles.periodInner}>
            {period.start}–{period.end}
          </SlideInLeft>
        </>
      ) : (
        <>
          {department && (
            <SlideInLeft className={styles.department}>{department}</SlideInLeft>
          )}
          <SlideInLeft className={styles.department}>{degree}</SlideInLeft>
          <SlideInRight className={styles.periodInner}>
            {period.start}–{period.end}
          </SlideInRight>
        </>
      )}
      {notes &&
        notes.map((note, i) =>
          index % 2 ? (
            <SlideInLeft key={i} className={styles.note}>
              {note}
            </SlideInLeft>
          ) : (
            <SlideInRight key={i} className={styles.note}>
              {note}
            </SlideInRight>
          ),
        )}
    </div>
  </ArrowContent>
);
export default Education;
