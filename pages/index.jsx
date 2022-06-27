import Head from 'next/head';
import { useEffect, useState } from 'react';
import EntriesPreview from '../components/entries-preview/entries-preview';
import Header from '../components/header/header';
import { getAllEntries, getTopEntries } from '../services/api';
import styles from './index.module.scss';

export default function Home() {
  const [topEntries, setTopEntries] = useState('loading');
  const [allEntries, setAllEntries] = useState([]);
  const [entriesSearchResults, setEntriesSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const initEntries = async () => {
    const topEntriesResponse = await getTopEntries();
    setTopEntries(topEntriesResponse);
    const entries = await getAllEntries();
    setAllEntries(entries);
  };

  const onSearch = (search) => {
    setSearchText(search);
    setEntriesSearchResults(
      allEntries.filter((entry) => entry?.item2?.includes(search))
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
        <Header onSearch={onSearch} entries={allEntries} />
        <div className="container">
          {searchText && (
            <div className={styles.entriesSearchResultsBox}>
              {entriesSearchResults?.length ? (
                <EntriesPreview
                  entries={entriesSearchResults}
                  title="תוצאות חיפוש"
                  isLoading={false}
                  isSmall={true}
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
