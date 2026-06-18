'use client';
import styles from '@/app/page.module.css';
import Providers from '@/app/providers';
import Publication from '@/components/pageDependents/Publication';
import { Locale } from '@/i18n/config';
import { useTranslation } from 'react-i18next';

import AcademicService from '@/components/pageDependents/AcademicService';
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
  AcademicService as AcademicServiceType,
  AwardsAndHonors as AwardsAndHonorsType,
  Education as EducationType,
  OtherExperience as OtherExperienceType,
  Publication as PublicationType,
  WorkExperience as WorkExperienceType,
} from '@/types';

const HomeContent = () => {
  const { t } = useTranslation();
  const preprints =
    (t('publications.content.preprint', {
      returnObjects: true,
    }) as PublicationType[] | undefined) ?? [];
  const sectionLinks = [
    { id: 'biography', text: t('biography.title') },
    { id: 'publications', text: t('publications.title') },
    { id: 'awards-and-honors', text: t('awardsAndHonors.title') },
    { id: 'work-experience', text: t('workExperience.title') },
    { id: 'education', text: t('education.title') },
    { id: 'academic-service', text: t('academicService.title') },
    { id: 'other-experience', text: t('otherExperience.title') },
    { id: 'technical-skills', text: t('technicalSkills.title') },
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <OpeningAnimation />
        <CustomParticles id='page-particles' />
        <div className={styles.basic}>
          <TitleBox />
        </div>
        <div className={styles.content}>
          <nav className={styles.sectionNav} aria-label='Section navigation'>
            {sectionLinks.map(({ id, text }, index) => [
              <a key={id} className={styles.sectionNavItem} href={`#${id}`}>
                {text}
              </a>,
              index === 4 && (
                <br key={`${id}-break`} className={styles.sectionNavBreak} />
              ),
            ])}
          </nav>
          <div id='biography' className={styles.contentBox}>
            <AnimatedHeader text={t('biography.title')} />
            <div className={styles.bio}>{t('biography.text')}</div>
          </div>
          <div id='publications' className={styles.contentBox}>
            <AnimatedHeader text={t('publications.title')} />
            <div className={styles.note}>{t('publications.note')}</div>
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
              text={t('publications.journal.text')}
              subtext={t('publications.journal.subtext')}
            />
            {(
              t('publications.content.journal', {
                returnObjects: true,
              }) as PublicationType[]
            ).map((publication, index) => (
              <Publication key={index} index={index} type='journal' {...publication} />
            ))}
            {!!preprints.length && (
              <>
                <Heading2
                  text={t('publications.preprint.text')}
                  subtext={t('publications.preprint.subtext')}
                />
                {preprints.map((publication, index) => (
                  <Publication
                    key={index}
                    index={index}
                    type='preprint'
                    {...publication}
                  />
                ))}
              </>
            )}
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
          <div id='awards-and-honors' className={styles.contentBox}>
            <AnimatedHeader text={t('awardsAndHonors.title')} />
            {(
              t('awardsAndHonors.content', {
                returnObjects: true,
              }) as AwardsAndHonorsType[]
            ).map((award, index) => (
              <AwardsAndHonors key={index} index={index} {...award} />
            ))}
          </div>
          <div id='work-experience' className={styles.contentBox}>
            <AnimatedHeader text={t('workExperience.title')} />
            {(
              t('workExperience.content', { returnObjects: true }) as WorkExperienceType[]
            ).map((workExperience, index) => (
              <WorkExperience key={index} index={index} {...workExperience} />
            ))}
          </div>
          <div id='education' className={styles.contentBox}>
            <AnimatedHeader text={t('education.title')} />
            {(t('education.content', { returnObjects: true }) as EducationType[]).map(
              (education, index) => (
                <Education key={index} index={index} {...education} />
              ),
            )}
          </div>
          <div id='academic-service' className={styles.contentBox}>
            <AnimatedHeader text={t('academicService.title')} />
            {(
              t('academicService.content', {
                returnObjects: true,
              }) as AcademicServiceType[]
            ).map((service, index) => (
              <AcademicService key={index} index={index} {...service} />
            ))}
          </div>
          <div id='other-experience' className={styles.contentBox}>
            <AnimatedHeader text={t('otherExperience.title')} />
            {(
              t('otherExperience.content', {
                returnObjects: true,
              }) as OtherExperienceType[]
            ).map((otherExperience, index) => (
              <OtherExperience key={index} index={index} {...otherExperience} />
            ))}
          </div>
          <div id='technical-skills' className={styles.contentBox}>
            <AnimatedHeader text={t('technicalSkills.title')} />
            <TechnicalSkills />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const HomePage = ({ locale }: { locale: Locale }) => (
  <Providers locale={locale}>
    <HomeContent />
  </Providers>
);

export default HomePage;
