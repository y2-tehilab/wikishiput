import styles from './entries-preview.module.scss';
import EntryPreviewGhost from './entry-preview-ghost/entry-preview-ghost';
import EntryPreviewSmall from './entry-preview-small/entry-preview-small';
import EntryPreview from './entry-preview/entry-preview';

export default function EntriesPreview({ entries, isLoading, title, isSmall }) {
  return (
    <div className={styles.entriesPreview}>
      <strong className={styles.title}>{title}</strong>
      {isLoading
        ? Array.from({ length: 10 }, (_, i) => i + 1).map((index) => (
            <EntryPreviewGhost key={`entry-preview-ghost-${index}`} />
          ))
        : entries.map((entry) =>
            isSmall ? (
              <EntryPreviewSmall
                key={`entry-preview-${entry.item1}`}
                id={entry.item1}
                headline={entry.item2}
              />
            ) : (
              <EntryPreview key={`entry-preview-${entry.id}`} {...entry} />
            )
          )}
    </div>
  );
}
