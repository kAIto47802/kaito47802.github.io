import styles from './ArrowContent.module.css';

const ArrowContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`${styles.markerContent} ${className ?? ''}`}>{children}</div>;
export default ArrowContent;
