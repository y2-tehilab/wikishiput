import Head from 'next/head';
import { useEffect, useState } from 'react';
import EditEntry from '../../../components/edit-entry/edit-entry';
import Header from '../../../components/header/header';
import NotificationPopup from '../../../components/notification-popup/notification-popup';
import { getAllEntries } from '../../../services/api';
import styles from './index.module.scss';

export default function Create() {
  const [allEntries, setAllEntries] = useState([]);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  let timeOut = null;

  const initEntries = async () => {
    const allEntriesResponse = await getAllEntries();
    setAllEntries(allEntriesResponse);
  };

  const setMessage = (message) => {
    setNotificationMessage(message);
    setIsSuccessMessageVisible(true);
  }

  useEffect(() => {
    initEntries();
  }, []);

  useEffect(() => {
    if(isSuccessMessageVisible) {
      timeOut = setTimeout(() => {
        setIsSuccessMessageVisible(false)
      }, 3000)
    }
    else clearTimeout(timeOut)
  }, [isSuccessMessageVisible]);

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.create}>
        <Header allEntries={allEntries} />
        <div className={`container ${styles.createContainer}`}>
          <EditEntry isNew={true} onSave={setMessage}/>
        </div>
        <NotificationPopup isVisible={isSuccessMessageVisible}>{notificationMessage}</NotificationPopup>
      </div>
    </div>
  );
}
