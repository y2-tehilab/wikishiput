import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { getEntry, deleteEntry, getAllEntries } from '../../services/api';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import PageLoader from '../../components/page-loader/page-loader';

export default observer(function Entry() {
  const [entry, setEntry] = useState(null);
  const [allEntries, setAllEntries] = useState([]);
  const router = useRouter();
  const store = useStore();
  const { isLoggedIn } = store.auth;

  const initEntries = async () => {
    const allEntriesResponse = await getAllEntries();
    setAllEntries(allEntriesResponse);
  };

  useEffect(() => {
    initEntries();
  }, []);

  const getEntryComp = async () => {
    const entryAwait = await getEntry(router.query.id);
    setEntry(entryAwait);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getEntryComp();
  }, [router.isReady, router.query.id]);

  const deleteCurrent = async () => {
    try {
      await deleteEntry(entry.id);
      router.push('/');
    } catch {}
  };

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.entry}>
        <Header allEntries={allEntries} />
        {!entry ? (
          <PageLoader />
        ) : (
          <div className={`container ${styles.entryContainer}`}>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>{entry.headline}</h1>
              {isLoggedIn && (
                <button className={styles.delete} onClick={deleteCurrent}>
                  <img src="/images/delete-icon.png" alt="delete image" />
                </button>
              )}
            </div>
            <div className={styles.description}>
              <div className={styles.imageBox}>
                <img src="/images/person.png" alt="person image" />
              </div>
              <p className={styles.content}>{entry.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
