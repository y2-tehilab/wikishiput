/* eslint-disable no-param-reassign */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import {
  getEntry,
  deleteEntry,
  getRankTypes,
  getStatisticTypes,
} from '../../services/api';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import PageLoader from '../../components/page-loader/page-loader';
import EntryContent from '../../components/entry-content/entry-content';
import Link from 'next/link';
import EntryStatistics from '../../components/entry-statistics/entry-statistics';
import EntryRanks from '../../components/entry-ranks/entry-ranks';

export default observer(function Entry() {
  const [entry, setEntry] = useState(null);
  const router = useRouter();
  const store = useStore();
  const { isLoggedIn } = store.auth;
  const [rankTypes, setRankTypes] = useState([]);
  const [statisticTypes, setStatisticTypes] = useState([]);

  useEffect(() => {
    const initEntry = async () => {
      const entryByQuery = await getEntry(router.query.id);
      setEntry(entryByQuery);
      const rankTypesResponse = await getRankTypes();
      setRankTypes(rankTypesResponse);
      const statisticTypesResponse = await getStatisticTypes();
      setStatisticTypes(
        statisticTypesResponse.reduce((statistics, statistic) => {
          statistics[statistic.id] = statistic.name;
          return statistics;
        }, {})
      );
    };

    if (!router.isReady) return;
    initEntry();
  }, [router.isReady, router.query.id]);

  const deleteCurrent = async () => {
    try {
      await deleteEntry(entry.id);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.entry}>
        <Header />
        {!entry ? (
          <PageLoader />
        ) : (
          <div className={`container ${styles.entryContainer}`}>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>
                <span>{entry.headline}</span>
                {isLoggedIn && (
                  <Link href={`/entry/edit?id=${entry.id}`}>
                    <a className={styles.editLink}>[עריכה]</a>
                  </Link>
                )}
              </h1>
              {isLoggedIn && (
                <button className={styles.delete} onClick={deleteCurrent}>
                  <img src="/images/delete-icon.png" alt="delete image" />
                </button>
              )}
            </div>
            <div className={styles.description}>
              <div className={styles.detailsBox}>
                <div className={styles.imageBox}>
                  <img
                    src={`http://${entry.entryFiles?.[0]?.imageUri}`}
                    alt="person image"
                  />
                </div>
                {!!entry?.entryStatistics?.length && (
                  <EntryStatistics
                    statistics={entry.entryStatistics}
                    title="סטטיסטיקות"
                    statisticsTypes={statisticTypes}
                  />
                )}
                <EntryRanks
                  entryId={entry.id}
                  ranks={entry.entryRanks}
                  title="ציונים"
                  ranksTypes={rankTypes}
                />
              </div>

              <EntryContent content={entry.entrySections?.[0]?.content} />
              <p className={styles.content}>{entry.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
