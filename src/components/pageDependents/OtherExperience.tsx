import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { OtherExperience as OtherExperienceType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import styles from './OtherExperience.module.css';

interface OtherExperienceProps extends OtherExperienceType {
  index: number;
}

const OtherExperience = ({
  index,
  place,
  period,
  descriptions,
  notes,
}: OtherExperienceProps) => (
  <ArrowContent className={styles.otherExperience}>
    <div className={styles.period}>
      <span>{period.start}</span>
      <br />
      <span> - {period.end}</span>
    </div>
    <div className={styles.content}>
      {index % 2 ? (
        <SlideInLeft className={styles.company}>{place}</SlideInLeft>
      ) : (
        <SlideInRight className={styles.company}>{place}</SlideInRight>
      )}
      {descriptions &&
        descriptions.map((desc, i) =>
          index % 2 ? (
            <SlideInRight key={i} className={styles.description}>
              {desc}
            </SlideInRight>
          ) : (
            <SlideInLeft key={i} className={styles.description}>
              {desc}
            </SlideInLeft>
          ),
        )}
      {index % 2 ? (
        <SlideInRight className={styles.periodInner}>
          {period.start} - {period.end}
        </SlideInRight>
      ) : (
        <SlideInLeft className={styles.periodInner}>
          {period.start} - {period.end}
        </SlideInLeft>
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
export default OtherExperience;
