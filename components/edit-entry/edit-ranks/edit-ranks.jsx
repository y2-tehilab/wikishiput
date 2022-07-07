import { useEffect, useState } from 'react';
import { createRankType, getRankTypes } from '../../../services/api';
import styles from './edit-ranks.module.scss';

export default function EditRanks() {
  const [newRankType, setNewRankType] = useState('');
  const [rankTypes, setRankTypes] = useState('');

  useEffect(() => {
    const initRanksTypes = async () => {
      const rankTypesResponse = await getRankTypes();
      setRankTypes(rankTypesResponse?.map(({ name }) => name)?.join(', '));
    };

    initRanksTypes();
  }, []);

  const addRankType = async () => {
    const rankType = await createRankType(newRankType);
    setRankTypes([...rankTypes, rankType]);
    setNewRankType('');
  };

  return (
    <div className={styles.editRanks}>
      <strong>ציונים</strong>
      <p>{rankTypes}</p>
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
