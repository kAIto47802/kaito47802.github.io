import SlideInLeft from '@/components/pure/SlideInLeft';
import SlideInRight from '@/components/pure/SlideInRight';
import { useTranslation } from 'react-i18next';
import ArrowContent from '../pure/ArrowContent';
import styles from './TechnicalSkills.module.css';

const TechnicalSkills = () => {
  const { t } = useTranslation();
  return (
    <>
      <SlideInLeft className={styles.title}>
        <ArrowContent>{t('technicalSkills.dealWith.title')}</ArrowContent>
      </SlideInLeft>
      <SlideInRight className={styles.content}>
        {t('technicalSkills.dealWith.content')}
      </SlideInRight>
      <SlideInLeft className={styles.title}>
        <ArrowContent>{t('technicalSkills.language.title')}</ArrowContent>
      </SlideInLeft>
      <SlideInRight className={styles.content}>
        {t('technicalSkills.language.advanced.title')}
      </SlideInRight>
      <SlideInLeft className={styles.langContent}>
        {t('technicalSkills.language.advanced.content')}
      </SlideInLeft>
      <SlideInRight className={styles.content}>
        {t('technicalSkills.language.intermediate.title')}
      </SlideInRight>
      <SlideInLeft className={styles.langContent}>
        {t('technicalSkills.language.intermediate.content')}
      </SlideInLeft>
      <SlideInRight className={styles.title}>
        <ArrowContent>{t('technicalSkills.tools.title')}</ArrowContent>
      </SlideInRight>
      <SlideInLeft className={styles.content}>
        {t('technicalSkills.tools.content')}
      </SlideInLeft>
    </>
  );
};
export default TechnicalSkills;
