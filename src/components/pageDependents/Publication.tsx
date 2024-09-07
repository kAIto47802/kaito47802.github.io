import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { Publication as PublicationType } from '@/types';
import ArrowContent from '../pure/ArrowContent';
import GitHubIcon from '../pure/GitHubIcon';
import styles from './Publication.module.css';

interface PublicationProps extends PublicationType {
  index: number;
}

const Publication = ({
  index,
  title,
  authors,
  conference,
  year,
  github,
}: PublicationProps) => (
  <ArrowContent className={styles.publication}>
    {index % 2 ? (
      <SlideInLeft className={styles.title}>{title}</SlideInLeft>
    ) : (
      <SlideInRight className={styles.title}>{title}</SlideInRight>
    )}
    {index % 2 ? (
      <SlideInRight className={styles.authors}>{authors}</SlideInRight>
    ) : (
      <SlideInLeft className={styles.authors}>{authors}</SlideInLeft>
    )}
    {index % 2 ? (
      <SlideInLeft className={styles.conference}>
        {conference}, {year}
        {github && <GitHubIcon link={github} />}
      </SlideInLeft>
    ) : (
      <SlideInRight className={styles.conference}>
        {conference}, {year}
        {github && <GitHubIcon link={github} />}
      </SlideInRight>
    )}
  </ArrowContent>
);
export default Publication;
