import { Fragment } from 'react';
import styles from './entry-details.module.scss';

export default function EntryDetails({
  details,
  title,
  detailsTypes,
  datailName,
}) {
  return (
    <div className={styles.entryDetails}>
      <strong className={styles.detailsTitle}>{title}</strong>
      <dl className={styles.detailsList}>
        {details.map((detail) => (
          <Fragment key={`detail-${detail.id}`}>
            <dt>{detailsTypes[detail[datailName]]}</dt>
            <dd>{detail.value}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}
