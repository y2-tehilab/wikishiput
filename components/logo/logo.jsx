import Link from 'next/link';
import styles from './logo.module.scss';

export default function Logo() {
  return (
    <Link href="/" passHref>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="logo wiki shiput" />
        <div className={styles.textBox}>
          <span className={styles.logoText}>ויקישיפוט</span>
          <span className={styles.subText}>האינציקלופדיה לשופטים</span>
        </div>
      </div>
    </Link>
  );
}
