import Link from 'next/link';
import styles from './top-entry.module.scss';

export default function TopEntry({ id, headline, content, entryFiles }) {
  return (
    <Link href={`/entry?id=${id}`} passHref>
      <div className={styles.topEntry}>
        <div className={styles.imageBox}>
          <img src="/images/person.png" alt="person image" />
        </div>

        <div className={styles.description}>
          <strong className={styles.headline}>{headline}</strong>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </Link>
  );
}
