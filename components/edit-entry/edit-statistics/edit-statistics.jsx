import { useEffect, useState } from 'react';
import { createStatisticType, getStatisticTypes } from '../../../services/api';
import { DEFAULT_STATISTIC } from '../../../services/entry/edit';
import styles from './edit-statistics.module.scss';

export default function EditStatistics({ entryStatistics, changeStatistics }) {
  const [newStatisticType, setNewStatisticType] = useState('');
  const [statisticTypes, setStatisticTypes] = useState([]);
  const [statistics, setStatistics] = useState(entryStatistics);

  useEffect(() => {
    const initStatisticsTypes = async () => {
      const statisticTypesResponse = await getStatisticTypes();
      setStatisticTypes(statisticTypesResponse);
    };

    initStatisticsTypes();
  }, []);

  const deleteStatistic = (index) => {
    const newStatistics = [...statistics];
    newStatistics.splice(index, 1);
    setStatistics(newStatistics);
    changeStatistics(newStatistics);
  };

  const changeStatisticValue = (statisticIndex, value) => {
    const oldStatistics = [...statistics];
    oldStatistics[statisticIndex].value = value;
    setStatistics(oldStatistics);
    changeStatistics(statistics);
  };

  const changeStatisticType = (statisticIndex, value) => {
    const oldStatistics = [...statistics];
    oldStatistics[statisticIndex].statisticType = value;
    setStatistics(oldStatistics);
    changeStatistics(statistics);
  };

  const addStatisticType = async () => {
    const statisticType = await createStatisticType(newStatisticType);
    setStatisticTypes([...statisticTypes, statisticType]);
    setNewStatisticType('');
  };

  const addStatistic = () => {
    setStatistics([...statistics, { ...DEFAULT_STATISTIC }]);
  };

  return (
    <div className={styles.editStatistics}>
      <strong>סטטיסטיקות</strong>
      <button onClick={addStatistic} className={styles.addButton}>
        + הוסף
      </button>

      {statistics.map((statistic, index) => (
        <div key={`detail-${index}`} className={styles.statistic}>
          <div className={styles.inputBox}>
            <label>סוג:</label>
            <select
              onChange={({ target }) =>
                changeStatisticType(index, target.value)
              }
              value={statistic.statisticType}
            >
              <option disabled value={0}>
                -- בחר --
              </option>
              {statisticTypes.map((statisticType) => (
                <option
                  value={statisticType.id}
                  key={`statistic-${statisticType.id}-${index}`}
                >
                  {statisticType.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBox}>
            <label>ערך:</label>
            <input
              type="text"
              value={statistic.value}
              onChange={({ target }) =>
                changeStatisticValue(index, target.value)
              }
            />
          </div>
          <button
            className={styles.removeButton}
            onClick={() => deleteStatistic(index)}
          >
            x
          </button>
        </div>
      ))}
      <div className={styles.newType}>
        <label>סוג חדש:</label>
        <input
          value={newStatisticType}
          onChange={({ target }) => setNewStatisticType(target.value)}
        />
        <button onClick={addStatisticType}>+ הוסף סוג</button>
      </div>
    </div>
  );
}
