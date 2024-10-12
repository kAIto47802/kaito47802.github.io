'use client';
import Publication from '@/components/pageDependents/Publication';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';

import AwardsAndHonors from '@/components/pageDependents/AwardsAndHonors';
import TechnicalSkills from '@/components/pageDependents/TechnicalSkills';
import TitleBox from '@/components/pageDependents/TitleBox';
import WorkExperience from '@/components/pageDependents/WorkExperience';
import AnimatedHeader from '@/components/pure/AnimatedHeader';
import CustomParticles from '@/components/pure/CustomParticles';
import Header from '@/components/pure/Header';
import Heading2 from '@/components/pure/Heading2';
import OpeningAnimation from '@/components/pure/OpeningAnimaiton';
import {
  AwardsAndHonors as AwardsAndHonorsType,
  Publication as PublicationType,
  WorkExperience as WorkExperienceType,
} from '@/types';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <main className={styles.main}>
        <OpeningAnimation />
        <CustomParticles />
        <div className={styles.basic}>
          <TitleBox />
        </div>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('publications.title')} />
            <Heading2
              text={t('publications.internationalConference.text')}
              subtext={t('publications.internationalConference.subtext')}
            />
            {(t('publications.content', { returnObjects: true }) as PublicationType[])
              .filter((publication) => publication.type === 'international conference')
              .map((publication, index) => (
                <Publication key={index} index={index} {...publication} />
              ))}
            <Heading2
              text={t('publications.workshop.text')}
              subtext={t('publications.workshop.subtext')}
            />
            {(t('publications.content', { returnObjects: true }) as PublicationType[])
              .filter((publication) => publication.type === 'workshop')
              .map((publication, index) => (
                <Publication key={index} index={index} {...publication} />
              ))}
            <Heading2
              text={t('publications.domesticConference.text')}
              subtext={t('publications.domesticConference.subtext')}
            />
            {(t('publications.content', { returnObjects: true }) as PublicationType[])
              .filter((publication) => publication.type === 'domestic conference')
              .map((publication, index) => (
                <Publication key={index} index={index} {...publication} />
              ))}
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('awardsAndHonors.title')} />
            {(
              t('awardsAndHonors.content', {
                returnObjects: true,
              }) as AwardsAndHonorsType[]
            ).map((award, index) => (
              <AwardsAndHonors key={index} index={index} {...award} />
            ))}
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('workExperience.title')} />
            {(
              t('workExperience.content', { returnObjects: true }) as WorkExperienceType[]
            ).map((workExperience, index) => (
              <WorkExperience key={index} index={index} {...workExperience} />
            ))}
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('technicalSkills.title')} />
            <TechnicalSkills />
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;
