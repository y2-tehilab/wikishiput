import styles from './top-entries.module.scss';
import TopEntry from './top-entry/top-entry';

export default function TopEntries({ topEntries }) {
  return (
    <div className={styles.topEntries}>
      <strong className={styles.title}>חיפושים אחרונים</strong>
      {topEntries.map(({ id, headline, content, entryFiles }) => (
        <TopEntry
          key={`top-entry-${id}`}
          id={id}
          headline={headline}
          content={content}
          entryFiles={entryFiles}
        />
      ))}
    </div>
  );
}
