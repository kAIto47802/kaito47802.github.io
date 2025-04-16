import { BASE_PATH } from '@/common/constants';
import i18n from '@/i18n/config';
import { Athiti, Caveat, Noticia_Text, Raleway } from 'next/font/google';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import CvIcon from '../pure/CvIcon';
import DropInText from '../pure/DropInText';
import GitHubIcon from '../pure/GitHubIcon';
import ScholarIcon from '../pure/ScholarIcon';
import SlideInText from '../pure/SlideInText';
import TypeWriter from '../pure/TypeWriter';
import styles from './TitleBox.module.css';

const noticia = Noticia_Text({ weight: '400', style: 'italic', subsets: ['latin'] });
const caveat = Caveat({ weight: '500', subsets: ['latin'] });
const raleway = Raleway({ weight: '400', subsets: ['latin'] });
const athiti = Athiti({ weight: '500', subsets: ['latin'] });

const TitleBox = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { t } = useTranslation();
  return (
    <div
      ref={ref}
      className={`${styles.basicBox} ${inView ? styles.inView : styles.outView}`}
    >
      <div className={styles.basicContent}>
        <div className={styles.iconBox}>
          {[...Array(3)].map((_, index) => (
            <Image
              key={index}
              src={`${BASE_PATH}/icon.jpg`}
              alt='icon'
              width={200}
              height={200}
              style={{ borderRadius: '50%' }}
            />
          ))}
        </div>
        <div className={styles.basicText}>
          <DropInText
            text='Kaito Baba'
            triggerOnce
            className={`${noticia.className} ${styles.name}`}
          />
          <DropInText
            text='(kAIto47802)'
            triggerOnce
            className={`${noticia.className} ${styles.id}`}
          />
          <div className={styles.affiliation}>
            {i18n.language == 'ja' && (
              <SlideInText
                text={t('basic.affiliation.textJa')}
                triggerOnce
                className={styles.fuiji}
              />
            )}
            <TypeWriter
              className={`${caveat.className} ${styles.caveat}`}
              text={t('basic.affiliation.text')}
            />
          </div>
          <div className={`${athiti.className} ${styles.contact}`}>
            k.ai.to47802 [at] gmail.com
          </div>
          <GitHubIcon
            className={styles.githubProfile}
            link='https://github.com/kAIto47802'
          />
          <ScholarIcon
            className={styles.scholarProfile}
            url='https://scholar.google.com/citations?user=oJvSC5wAAAAJ'
          />
          <CvIcon className={styles.scholarProfile} url='cv.pdf' />
        </div>
      </div>
    </div>
  );
};
export default TitleBox;
