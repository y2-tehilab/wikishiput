import Head from 'next/head';
import EditEntry from '../../../components/edit-entry/edit-entry';
import Header from '../../../components/header/header';
import styles from './index.module.scss';

export default function Create() {
  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.create}>
        <Header />
        <div className={`container ${styles.createContainer}`}>
          <EditEntry isNew={true}/>
        </div>
      </div>
    </div>
  );
}
