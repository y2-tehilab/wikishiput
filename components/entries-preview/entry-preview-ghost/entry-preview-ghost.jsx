import styles from './entry-preview-ghost.module.scss';

export default function EntryPreviewGhost() {
  return (
    <div className={styles.entryPreviewGhost}>
      <div className={styles.imageBoxGhost}></div>
      <div className={styles.descriptionGhost}>
        <div className={styles.headlineGhost}></div>
        <div className={styles.contentGhost}></div>
      </div>
    </div>
  );
}
