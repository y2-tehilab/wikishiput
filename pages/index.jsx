import Head from 'next/head';
import TopEntries from '../components/top-entries/top-entries';
import HomeHeader from '../features/home/home-header/home-header';
import { getAllEntries, getTopEntries } from '../services/api';
import styles from './index.module.scss';

export default function Home({topEntries, allEntries}) {
  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className={styles.home}>
        <HomeHeader allEntries={allEntries}/>
        <div className={`container ${styles.topEntriesContainer}`}>
          <TopEntries topEntries={topEntries} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const topEntries = await getTopEntries();
  const allEntries = await getAllEntries();

  return {
    props: { topEntries, allEntries },
  };
};
