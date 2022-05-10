import Link from 'next/link';
import styles from './logo.module.scss';

export default function Logo() {
  return (
    <Link href="/" passHref>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="logo wiki shiput" />
        <span className={styles.logoText}>ויקי-שיפוט</span>
      </div>
    </Link>
  );
}
