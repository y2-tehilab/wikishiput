import Link from 'next/link';
import styles from './entry-preview-small.module.scss';

export default function EntryPreviewSmall({ id, headline }) {
  return (
    <Link href={`/entry?id=${id}`} passHref>
      <a className={styles.entryPreviewSmall}>
        <strong className={styles.headline}>{headline}</strong>
      </a>
    </Link>
  );
}
