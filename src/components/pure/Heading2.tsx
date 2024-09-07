import { Edu_VIC_WA_NT_Beginner, Zen_Kurenaido } from 'next/font/google';
import { useTranslation } from 'react-i18next';
import styles from './Heading2.module.css';

const eduVic = Edu_VIC_WA_NT_Beginner({ weight: '400', subsets: ['latin'] });
const zenKurenaido = Zen_Kurenaido({ weight: '400', subsets: ['latin-ext'] });

const Heading2 = ({ text, subtext }: { text: string; subtext?: string }) => {
  const { i18n } = useTranslation();
  return (
    <h2
      className={`${i18n.language == 'en' ? eduVic.className : zenKurenaido.className} ${styles.heading2}`}
    >
      {text}
      {subtext && (
        <span className={`${eduVic.className} ${styles.subtext}`}>{subtext}</span>
      )}
    </h2>
  );
};
export default Heading2;
