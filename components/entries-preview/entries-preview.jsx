import styles from './entries-preview.module.scss';
import EntryPreviewGhost from './entry-preview-ghost/entry-preview-ghost';
import EntryPreview from './entry-preview/entry-preview';

export default function EntriesPreview({ entries, isLoading, title }) {
  return (
    <div className={styles.entriesPreview}>
      <strong className={styles.title}>{title}</strong>
      {isLoading
        ? Array.from({ length: 10 }, (_, i) => i + 1).map((index) => (
            <EntryPreviewGhost key={`entry-preview-ghost-${index}`} />
          ))
        : entries.map(({ id, headline, content, entryFiles }) => (
            <EntryPreview
              key={`entry-preview-${id}`}
              id={id}
              headline={headline}
              content={content}
              entryFiles={entryFiles}
            />
          ))}
    </div>
  );
}
