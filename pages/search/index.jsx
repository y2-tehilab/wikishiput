import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllEntries } from '../../services/api';
import EntriesPreview from '../../components/entries-preview/entries-preview';
import Header from '../../components/header/header';
import styles from './index.module.scss';

export default function Search() {
  const [entriesSearchResults, setEntriesSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [allEntries, setAllEntries] = useState([]);
  const router = useRouter();

  const initEntries = async () => {
    const entries = await getAllEntries();
    setAllEntries(entries);
  };

  const onSearch = (text) => {
    setSearchText(text);
    setEntriesSearchResults(
      allEntries.filter((entry) => entry?.item2?.includes(text))
    );
  };

  useEffect(() => {
    initEntries();
  }, []);

  useEffect(() => {
    if (router.isReady && allEntries?.length) {
      setSearchText(router.query.search);
      setEntriesSearchResults(
        allEntries.filter((entry) =>
          entry?.item2?.includes(router.query.search)
        )
      );
    }
  }, [router.isReady, allEntries, router.query.search]);

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className={styles.search}>
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
        </div>
      </div>
    </div>
  );
}
