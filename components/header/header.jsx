import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllEntries } from '../../services/api';
import { useStore } from '../../store';
import Logo from '../logo/logo.jsx';
import SearchInput from '../search-input/search-input';
import styles from './header.module.scss';

export default function Header({ onSearch, entries }) {
  const store = useStore();
  const { isLoggedIn } = store.auth;
  const [options, setOptions] = useState([]);

  const initEntries = async () => {
    const allEntriesResponse = entries?.length
      ? entries
      : await getAllEntries();
    const options = allEntriesResponse.map(({ item1, item2 }) => ({
      text: item2,
      value: item1,
    }));
    setOptions(options);
  };

  useEffect(() => {
    initEntries();
  }, []);

  return (
    <div className={styles.header}>
      <Logo />
      {options?.length ? (
        <SearchInput
          options={options}
          searchClicked={onSearch ? onSearch : null}
        />
      ) : null}
      <Link href={isLoggedIn ? '/entry/create' : '/login'}>
        <a className={styles.link}>{isLoggedIn ? 'יצירת ערך' : 'התחברות'}</a>
      </Link>
    </div>
  );
}
