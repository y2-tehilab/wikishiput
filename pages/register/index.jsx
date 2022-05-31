import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.scss';
import { useStore } from '../../store';
import Link from 'next/link';
import ButtonLoader from '../../components/button-loader/button-loader';
import Header from '../../components/header/header';

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
    } catch (e) {
    } finally {
      setIsRequestInProgress(false);
    }
  };

  return (
    <div>
      <Head>
        <title>ויקישיפוט</title>
        <meta name="description" content="ויקי שיפוט" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className={styles.register}>
        <Header />
        <div className={`container ${styles.registerContainer}`}>
          <h1 className={styles.title}>יצירת חשבון חדש</h1>
          <div className={styles.fieldsBox}>
            <label htmlFor="name" className={styles.label}>
              שם משתמש
            </label>
            <input
              type="text"
              value={name}
              id="name"
              className={`${styles.input} input`}
              placeholder="יש להקליד את שם המשתמש"
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="email" className={styles.label}>
              כתובת דוא"ל
            </label>
            <input
              type="text"
              value={email}
              id="email"
              placeholder="יש להקליד את כתובת הדוא''ל שלך"
              className={`${styles.input} input`}
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
              placeholder="יש להקליד סיסמה"
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
              placeholder="יש להקליד את הסיסמה שנית"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <ButtonLoader
              text="יצירת החשבון שלך"
              onClick={register}
              isLoading={isRequestInProgress}
            />
            <Link href="/login">
              <a className={styles.loginLink}>להתחברות</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
