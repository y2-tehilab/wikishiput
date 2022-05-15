import Head from 'next/head';
import { useEffect, useState } from 'react';
import Logo from '../../components/logo/logo';
import styles from './index.module.scss';
import { useStore } from '../../store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonLoader from '../../components/button-loader/button-loader';
import NotificationPopup from '../../components/notification-popup/notification-popup';

export default function Login() {
  const [email, setEmail] = useState('t4136618@gmail.com');
  const [password, setPassword] = useState('tehila123');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const router = useRouter();
  const store = useStore();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  let timeOut = null;

  const messages = {
    wrongEmailOrPassword: 'מייל או סיסמא לא נכונים',
    failed: 'שגיאה בעת התחברות',
  }

  const setMessage = (message) => {
    setNotificationMessage(message);
    setIsSuccessMessageVisible(true);
  }

  const login = async () => {
    try {
      setIsRequestInProgress(true);
      await store.auth.login(email, password);
      router.push('/');
    } catch (e) {
      if(e.response?.data?.message === 'Username or password is incorrect')
        setMessage(messages.wrongEmailOrPassword)
      else setMessage(messages.failed)
    }
    finally {
      setIsRequestInProgress(false);
    }
  };

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
      <div className={styles.login}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`container ${styles.loginContainer}`}>
          <h1 className={styles.title}>התחברות</h1>
          <label htmlFor="email" className={styles.label}>
            מייל
          </label>
          <input
            type="text"
            value={email}
            id="email"
            className={`${styles.input} input`}
            placeholder="הקלד מייל"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password" className={styles.label}>
            סיסמא
          </label>
          <input
            type="password"
            value={password}
            id="password"
            className={`${styles.input} input`}
            placeholder="הקלד סיסמה"
            onChange={(event) => setPassword(event.target.value)}
          />
          <ButtonLoader text='התחברות' onClick={login} isLoading={isRequestInProgress}/>
          <Link href="/register">
            <a className={styles.registerLink}>להרשמה</a>
          </Link>
        </div>
        <NotificationPopup isVisible={isSuccessMessageVisible}>{notificationMessage}</NotificationPopup>
      </div>
    </div>
  )
}