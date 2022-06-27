import Link from 'next/link';
import styles from './entry-preview.module.scss';

export default function EntryPreview({ id, headline, content, entryFiles }) {
  return (
    <Link href={`/entry?id=${id}`} passHref>
      <a className={styles.entryPreview}>
        <div className={styles.imageBox}>
          <img src={`http://${entryFiles?.[0]?.imageUri}`} alt="person image" />
        </div>

        <div className={styles.description}>
          <strong className={styles.headline}>{headline}</strong>
          <p className={styles.content}>{content}</p>
        </div>
      </a>
    </Link>
  );
}
