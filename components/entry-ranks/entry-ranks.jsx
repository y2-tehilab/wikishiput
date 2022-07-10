/* eslint-disable no-param-reassign, no-magic-numbers */
import Cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { rankEntry } from '../../services/api';
import styles from './entry-ranks.module.scss';

export default function EntryRanks({
  entryId,
  ranks,
  title,
  ranksTypes,
  onSave,
}) {
  const sessionId = Cookies.get('session-id');
  const ranksStars = [];
  const [entryRanks, setEntryRanks] = useState([]);

  const messages = {
    successRank: 'הערך דורג בהצלחה',
    failed: 'שגיאה בדרוג הערך',
  };

  useEffect(() => {
    setEntryRanks(
      ranks.reduce((ranksByTypes, rank) => {
        if (ranksByTypes?.[rank.rankType]) {
          ranksByTypes[rank.rankType].sumRanks += parseInt(rank.value);
          ranksByTypes[rank.rankType].countRanks++;
        } else
          ranksByTypes[rank.rankType] = {
            sumRanks: parseInt(rank.value),
            countRanks: 1,
            rankName: ranksTypes?.find(
              (rankType) => rankType.id === rank.rankType
            )?.name,
            rankTypeId: rank.rankType,
          };
        return ranksByTypes;
      }, {})
    );
  }, [ranksTypes]);

  const ratingChanged = (rankType, value) => {
    const rankStarsIndex = ranksStars.findIndex(
      (rank) => rank.rankType === rankType
    );
    if (rankStarsIndex === -1)
      ranksStars.push({
        entryId,
        rankType,
        value: value.toString(),
        sessionId,
      });
    else ranksStars[rankStarsIndex].value = value.toString();
  };

  const rankStarsEntry = () => {
    try {
      ranksStars.forEach((rankStar) => rankEntry(rankStar));
      onSave(messages.successRank);
    } catch (error) {
      console.log(error);
      onSave(messages.failed);
    }
  };

  return (
    <div className={styles.entryRanks}>
      <strong className={styles.ranksTitle}>{title}</strong>
      <dl className={styles.ranksList}>
        {Object.values(entryRanks).map((rank) => (
          <Fragment key={`rank-${rank.rankTypeId}`}>
            <dt>{rank.rankName}</dt>
            <dd>{rank.sumRanks / rank.countRanks}</dd>
          </Fragment>
        ))}
      </dl>
      <strong className={styles.starsTitle}>דרג את השופט:</strong>
      {ranksTypes.map((rank) => (
        <div key={`rank-stars-${rank.id}`} className={styles.rankStarsBox}>
          <span className={styles.rankStarsText}>{rank.name}</span>
          <ReactStars
            count={5}
            onChange={(value) => ratingChanged(rank.id, value)}
            size={18}
            color2={'#f4c600'}
            half={false}
          />
        </div>
      ))}
      <button className={styles.rankButton} onClick={rankStarsEntry}>
        דרג
      </button>
    </div>
  );
}
