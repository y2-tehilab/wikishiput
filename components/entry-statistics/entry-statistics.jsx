import { Fragment } from 'react';
import styles from './entry-statistics.module.scss';

export default function EntryStatistics({
  statistics,
  title,
  statisticsTypes,
}) {
  return (
    <div className={styles.entryStatistics}>
      <strong className={styles.statisticsTitle}>{title}</strong>
      <dl className={styles.statisticsList}>
        {statistics.map((statistic) => (
          <Fragment key={`statistic-${statistic.id}`}>
            <dt>{statisticsTypes[statistic.statisticType]}</dt>
            <dd>{statistic.value}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}
