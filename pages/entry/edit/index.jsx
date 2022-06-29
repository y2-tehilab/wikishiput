import Head from 'next/head';
import { useEffect, useState } from 'react';
import EditEntry from '../../../components/edit-entry/edit-entry';
import Header from '../../../components/header/header';
import NotificationPopup from '../../../components/notification-popup/notification-popup';
import { getAllEntries, getEntry } from '../../../services/api';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import PageLoader from '../../../components/page-loader/page-loader';

export default function Edit() {
  const [entry, setEntry] = useState(null);
  const [allEntries, setAllEntries] = useState([]);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  let timeOut = null;
  const router = useRouter();

  const getEntryByQuery = async () => {
    const entryByQuery = await getEntry(router.query.id);
    setEntry(entryByQuery);
  };

  const initEntries = async () => {
    const allEntriesResponse = await getAllEntries();
    setAllEntries(allEntriesResponse);
  };

  const setMessage = (message) => {
    setNotificationMessage(message);
    setIsSuccessMessageVisible(true);
  };

  useEffect(() => {
    initEntries();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    getEntryByQuery();
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (isSuccessMessageVisible) {
      const ms = 3000;
      timeOut = setTimeout(() => {
        setIsSuccessMessageVisible(false);
      }, ms);
    } else clearTimeout(timeOut);
  }, [isSuccessMessageVisible]);

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.edit}>
        <Header allEntries={allEntries} />
        {!entry ? (
          <PageLoader />
        ) : (
          <>
            <div className={`container ${styles.editContainer}`}>
              <EditEntry isNew={false} entry={entry} onSave={setMessage} />
            </div>
            <NotificationPopup isVisible={isSuccessMessageVisible}>
              {notificationMessage}
            </NotificationPopup>
          </>
        )}
      </div>
    </div>
  );
}
