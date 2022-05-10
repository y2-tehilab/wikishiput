import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { getEntry, deleteEntry } from '../../services/api';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';

export default observer(function Entry() {
  const [entry, setEntry] = useState(null);
  const router = useRouter();
  const store = useStore();
  const { isLoggedIn } = store.auth;

  const getEntryComp = async () => {
    const entryAwait = await getEntry(router.query.id);
    setEntry(entryAwait);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getEntryComp();
  }, [router.isReady]);

  if (!entry) return <div>Loading...</div>;

  const deleteCurrent = async () => {
    try {
      await deleteEntry(entry.id);
      router.push('/')
    } catch {}
  }

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.entry}>
        <Header />
        <div className={`container ${styles.entryContainer}`}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{entry.headline}</h1>
            {isLoggedIn && 
              <button className={styles.delete} onClick={deleteCurrent}>
                <img src="/images/delete-icon.png" alt="delete image" />
              </button>
              }
          </div>
          <div className={styles.description}>
            <div className={styles.imageBox}>
              <img src="/images/person.png" alt="person image" />
            </div>
            <p className={styles.content}>
              {entry.content} לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג
              אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי
              לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו
              ננבי, צמוקו בלוקריה שיצמה ברורק. לורם איפסום דולור סיט אמט, מוסן
              מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. גולר
              מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, לורם איפסום דולור
              סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס
              איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל
              אאוגו וסטיבולום סוליסי טידום בעליק. קולורס מונפרד אדנדום סילקוף,
              מרגשי ומרגשח. עמחליף קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
              בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי
              צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. סחטיר
              בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם
              ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן
              מנת. צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.
              נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן נולום ארווס סאפיאן -
              פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ
              קליר, בנפת נפקט למסון בלרק - וענוף קולהע צופעט למרקוח איבן איף,
              ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס
              לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור
              ליאמום בלינך רוגצה. לפמעט קונדימנטום קורוס בליקרה, נונסטי קלובר
              בריקנה סטום, לפריקך תצטריק לרטי. ושבעגט ליבם סולגק. בראיט ולחת
              צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם
              בורק? לתיג ישבעס.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
})
