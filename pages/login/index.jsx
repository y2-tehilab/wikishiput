import Head from 'next/head';
import { useState } from 'react';
import Logo from '../../components/logo/logo';
import styles from './index.module.scss';
import { useStore } from '../../store';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('t4136618@gmail.com');
  const [password, setPassword] = useState('tehila123');
  const router = useRouter();
  const store = useStore();

  const login = async () => {
    try {
      await store.auth.login(email, password);
      router.push('/');
    } catch (e) {}
  };

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
          <button onClick={login} className={styles.loginButton}>
            התחברות
          </button>
          <Link href="/register">
            <a className={styles.registerLink}>להרשמה</a>
          </Link>
        </div>
      </div>
    </div>
  )
}