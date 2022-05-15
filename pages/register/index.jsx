import Head from 'next/head';
import { useState } from 'react';
import Logo from '../../components/logo/logo';
import styles from './index.module.scss';
import { useStore } from '../../store';
import Link from 'next/link';
import ButtonLoader from '../../components/button-loader/button-loader';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const store = useStore();

  const register = async () => {
    try {
      setIsRequestInProgress(true);
      await store.auth.register(email, name, password, confirmPassword);
      router.push('/');
    } catch (e) {}
    finally {
      setIsRequestInProgress(false);
    }
  };

  return (
    <div>
      <Head>
        <title>ויקי-שיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.register}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`container ${styles.registerContainer}`}>
          <h1 className={styles.title}>הרשמה</h1>
          <label htmlFor="name" className={styles.label}>
            שם משתמש
          </label>
          <input
            type="text"
            value={name}
            id="name"
            className={`${styles.input} input`}
            placeholder="הקלד שם משתמש"
            onChange={(event) => setName(event.target.value)}
          />
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
          <label htmlFor="confirmPassword" className={styles.label}>
            אימות סיסמא
          </label>
          <input
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            className={`${styles.input} input`}
            placeholder="הקלד סיסמה"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <ButtonLoader text='הרשמה' onClick={register} isLoading={isRequestInProgress}/>
          <Link href="/login">
            <a className={styles.loginLink}>להתחברות</a>
          </Link>
        </div>
      </div>
    </div>
  );
  }