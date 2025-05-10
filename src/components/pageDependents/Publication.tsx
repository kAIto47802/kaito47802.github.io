import ArrowContent from '@/components/pure/ArrowContent';
import ArXivIcon from '@/components/pure/ArXivIcon';
import ExternalLinkIcon from '@/components/pure/ExternalLinkIcon';
import GitHubIcon from '@/components/pure/GitHubIcon';
import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { Publication as PublicationType } from '@/types';
import { Trans } from 'react-i18next';
import LinkIcon from '../pure/LinkIcon';
import styles from './Publication.module.css';

interface PublicationProps extends PublicationType {
  index: number;
  type: string;
}

const Publication = ({
  index,
  title,
  conference,
  year,
  github,
  arxiv,
  poster,
  paper,
  link,
  type,
}: PublicationProps) => {
  const authorsKey = `publications.content.${type}.${index}.authors`;
  return (
    <ArrowContent className={styles.publication}>
      {index % 2 ? (
        <SlideInLeft className={styles.title}>{title}</SlideInLeft>
      ) : (
        <SlideInRight className={styles.title}>{title}</SlideInRight>
      )}
      {index % 2 ? (
        <SlideInRight className={styles.authors}>
          <Trans
            i18nKey={authorsKey}
            components={{ underline: <span className={styles.underline} /> }}
          />
        </SlideInRight>
      ) : (
        <SlideInLeft className={styles.authors}>
          <Trans
            i18nKey={authorsKey}
            components={{ underline: <span className={styles.underline} /> }}
          />
        </SlideInLeft>
      )}
      {index % 2 ? (
        <SlideInLeft className={styles.conference}>
          {conference}, {year}
          <div className={styles.icons}>
            {github && <GitHubIcon {...github} />}
            {arxiv && <ArXivIcon num={arxiv} />}
            {paper && <ExternalLinkIcon {...paper} name='Paper' />}
            {poster && <ExternalLinkIcon {...poster} name='Poster' />}
            {link && <LinkIcon link={link} />}
          </div>
        </SlideInLeft>
      ) : (
        <SlideInRight className={styles.conference}>
          {conference}, {year}
          <div className={styles.icons}>
            {github && <GitHubIcon {...github} />}
            {arxiv && <ArXivIcon num={arxiv} />}
            {paper && <ExternalLinkIcon {...paper} name='Paper' />}
            {poster && <ExternalLinkIcon {...poster} name='Poster' />}
            {link && <LinkIcon link={link} />}
          </div>
        </SlideInRight>
      )}
    </ArrowContent>
  );
};
export default Publication;
