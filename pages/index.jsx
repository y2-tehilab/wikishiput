import Head from 'next/head';
import { useEffect, useState } from 'react';
import EntriesPreview from '../components/entries-preview/entries-preview';
import HomeHeader from '../features/home/home-header/home-header';
import { getAllEntries, getTopEntries } from '../services/api';
import styles from './index.module.scss';

export default function Home() {
  const [topEntries, setTopEntries] = useState('loading');
  const [allEntries, setAllEntries] = useState([]);
  const [entriesSearchResults, setEntriesSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const initEntries = async () => {
    const topEntriesResponse = await getTopEntries();
    const allEntriesResponse = await getAllEntries();
    setTopEntries(topEntriesResponse);
    setAllEntries(allEntriesResponse);
  };

  const onSearch = (searchText) => {
    setSearchText(searchText);
    setEntriesSearchResults(
      topEntries.filter((entry) => entry?.headline?.includes(searchText))
    );
  };

  useEffect(() => {
    initEntries();
  }, []);

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className={styles.home}>
        <HomeHeader allEntries={allEntries} onSearch={onSearch} />
        <div className="container">
          {searchText && (
            <div className={styles.entriesSearchResultsBox}>
              {entriesSearchResults?.length ? (
                <EntriesPreview
                  entries={entriesSearchResults}
                  title="תוצאות חיפוש"
                  isLoading={false}
                />
              ) : (
                <p className={styles.noResultsText}>
                  לא נמצאו תוצאות תואמות לחיפוש שביצעת
                </p>
              )}
            </div>
          )}
          <div className={styles.topEntriesBox}>
            <EntriesPreview
              entries={topEntries}
              isLoading={topEntries === 'loading'}
              title="חיפושים אחרונים"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
