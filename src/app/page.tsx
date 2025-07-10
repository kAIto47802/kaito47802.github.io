'use client';
import Publication from '@/components/pageDependents/Publication';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';

import AwardsAndHonors from '@/components/pageDependents/AwardsAndHonors';
import Education from '@/components/pageDependents/Education';
import OtherExperience from '@/components/pageDependents/OtherExperience';
import TechnicalSkills from '@/components/pageDependents/TechnicalSkills';
import TitleBox from '@/components/pageDependents/TitleBox';
import WorkExperience from '@/components/pageDependents/WorkExperience';
import AnimatedHeader from '@/components/pure/AnimatedHeader';
import CustomParticles from '@/components/pure/CustomParticles';
import Footer from '@/components/pure/Footer';
import Header from '@/components/pure/Header';
import Heading2 from '@/components/pure/Heading2';
import OpeningAnimation from '@/components/pure/OpeningAnimation';
import {
  AwardsAndHonors as AwardsAndHonorsType,
  Education as EducationType,
  OtherExperience as OtherExperienceType,
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
            <AnimatedHeader text={t('biography.title')} />
            <div className={styles.bio}>{t('biography.text')}</div>
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('publications.title')} />
            <Heading2
              text={t('publications.internationalConference.text')}
              subtext={t('publications.internationalConference.subtext')}
            />
            {(
              t('publications.content.internationalConference', {
                returnObjects: true,
              }) as PublicationType[]
            ).map((publication, index) => (
              <Publication
                key={index}
                index={index}
                type='internationalConference'
                {...publication}
              />
            ))}
            <Heading2
              text={t('publications.workshop.text')}
              subtext={t('publications.workshop.subtext')}
            />
            {(
              t('publications.content.workshop', {
                returnObjects: true,
              }) as PublicationType[]
            ).map((publication, index) => (
              <Publication key={index} index={index} type='workshop' {...publication} />
            ))}
            <Heading2
              text={t('publications.article.text')}
              subtext={t('publications.article.subtext')}
            />
            {(
              t('publications.content.article', {
                returnObjects: true,
              }) as PublicationType[]
            ).map((publication, index) => (
              <Publication key={index} index={index} type='article' {...publication} />
            ))}
            <Heading2
              text={t('publications.domesticConference.text')}
              subtext={t('publications.domesticConference.subtext')}
            />
            {(
              t('publications.content.domesticConference', {
                returnObjects: true,
              }) as PublicationType[]
            ).map((publication, index) => (
              <Publication
                key={index}
                index={index}
                type='domesticConference'
                {...publication}
              />
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
            <AnimatedHeader text={t('education.title')} />
            {(t('education.content', { returnObjects: true }) as EducationType[]).map(
              (education, index) => (
                <Education key={index} index={index} {...education} />
              ),
            )}
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('otherExperience.title')} />
            {(
              t('otherExperience.content', {
                returnObjects: true,
              }) as OtherExperienceType[]
            ).map((otherExperience, index) => (
              <OtherExperience key={index} index={index} {...otherExperience} />
            ))}
          </div>
          <div className={styles.contentBox}>
            <AnimatedHeader text={t('technicalSkills.title')} />
            <TechnicalSkills />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;
