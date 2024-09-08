import { BASE_PATH } from '@/common/constants';
import { Caveat, Noticia_Text } from 'next/font/google';
import Image from 'next/image';
import GitHubIcon from '../pure/GitHubIcon';
import styles from './TitleBox.module.css';

const noticia = Noticia_Text({ weight: '400', style: 'italic', subsets: ['latin'] });
const caveat = Caveat({ weight: '500', subsets: ['latin'] });

const TitleBox = () => {
  // const { ref, inView } = useInView();
  return (
    <div
      // ref={ref}
      // className={`${styles.basicBox} ${inView ? styles.boxInView : styles.boxOutView}`}
      className={styles.basicBox}
    >
      <div className={styles.basicContent}>
        <Image
          className={styles.icon}
          src={`${BASE_PATH}/icon.jpg`}
          alt='icon'
          width={200}
          height={200}
          style={{ borderRadius: '50%' }}
        />
        <div className={styles.basicText}>
          <div className={`${noticia.className} ${styles.name}`}>kAIto47802</div>
          <div className={styles.affiliation}>
            {/* <TypeWriter
              className={
                i18n.language == 'ja'
                  ? styles.fuiji
                  : `${caveat.className} ${styles.caveat}`
              }
              text={t('basic.affiliation.text')}
            />
            {t('basic.affiliation.subText') && (
              <TypeWriter
                className={
                  i18n.language == 'ja' ? `${caveat.className} ${styles.caveat}` : ''
                }
                text={t('basic.affiliation.subText')}
              />
            )} */}
          </div>
          <GitHubIcon
            className={styles.githubProfile}
            link='https://github.com/kAIto47802'
          />
        </div>
      </div>
    </div>
  );
};
export default TitleBox;
