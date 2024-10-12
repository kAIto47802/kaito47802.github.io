import ArrowContent from '@/components/pure/ArrowContent';
import ArXivIcon from '@/components/pure/ArXivIcon';
import GitHubIcon from '@/components/pure/GitHubIcon';
import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { Publication as PublicationType } from '@/types';
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
  arxiv,
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
        <div className={styles.icons}>
          {github && <GitHubIcon link={github} />}
          {arxiv && <ArXivIcon num={arxiv} />}
        </div>
      </SlideInLeft>
    ) : (
      <SlideInRight className={styles.conference}>
        {conference}, {year}
        <div className={styles.icons}>
          {github && <GitHubIcon link={github} />}
          {arxiv && <ArXivIcon num={arxiv} />}
        </div>
      </SlideInRight>
    )}
  </ArrowContent>
);
export default Publication;
