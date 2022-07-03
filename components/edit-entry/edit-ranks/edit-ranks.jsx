import { useEffect, useState } from 'react';
import { createRankType, getRankTypes } from '../../../services/api';
import { DEFAULT_RANK } from '../../../services/entry/edit';
import styles from './edit-ranks.module.scss';

export default function EditRanks({ entryRanks, changeRanks }) {
  const [newRankType, setNewRankType] = useState('');
  const [ranks, setRanks] = useState(entryRanks);
  const [rankTypes, setRankTypes] = useState([]);

  useEffect(() => {
    const initRanksTypes = async () => {
      const rankTypesResponse = await getRankTypes();
      setRankTypes(rankTypesResponse);
    };

    initRanksTypes();
  }, []);

  const deleteRank = (index) => {
    const newRanks = [...ranks];
    newRanks.splice(index, 1);
    setRanks(newRanks);
    changeRanks(newRanks);
  };

  const changeRankValue = (rankIndex, value) => {
    const oldRanks = [...ranks];
    oldRanks[rankIndex].value = value;
    setRanks(oldRanks);
    changeRanks(ranks);
  };

  const changeRankType = (rankIndex, value) => {
    const oldRanks = [...ranks];
    oldRanks[rankIndex].rankType = value;
    setRanks(oldRanks);
    changeRanks(ranks);
  };

  const addRankType = async () => {
    const rankType = await createRankType(newRankType);
    setRankTypes([...rankTypes, rankType]);
    setNewRankType('');
  };

  const addRank = () => {
    setRanks([...ranks, DEFAULT_RANK]);
  };

  return (
    <div className={styles.editRanks}>
      <strong>ציונים</strong>
      <button onClick={addRank} className={styles.addButton}>
        + הוסף
      </button>

      {ranks.map((rank, index) => (
        <div key={`detail-${index}`} className={styles.rank}>
          <div className={styles.inputBox}>
            <label>סוג:</label>
            <select
              onChange={({ target }) => changeRankType(index, target.value)}
              value={rank.rankType}
            >
              <option disabled value={0}>
                -- בחר --
              </option>
              {rankTypes.map((rankType) => (
                <option
                  value={rankType.id}
                  key={`rank-${rankType.id}-${index}`}
                >
                  {rankType.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBox}>
            <label>ערך:</label>
            <input
              type="text"
              value={rank.value}
              onChange={({ target }) => changeRankValue(index, target.value)}
            />
          </div>
          <button
            className={styles.removeButton}
            onClick={() => deleteRank(index)}
          >
            x
          </button>
        </div>
      ))}
      <div className={styles.newType}>
        <label>סוג חדש:</label>
        <input
          value={newRankType}
          onChange={({ target }) => setNewRankType(target.value)}
        />
        <button onClick={addRankType}>+ הוסף סוג</button>
      </div>
    </div>
  );
}
