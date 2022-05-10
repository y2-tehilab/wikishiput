import SearchInput from '../../../components/search-input/search-input';
import Logo from '../../../components/logo/logo';
import styles from './home-header.module.scss';
import Link from 'next/link';
import { useStore } from '../../../store';
import { observer } from 'mobx-react-lite';

export default observer(function HomeHeader({allEntries}) {
  const store = useStore();
  const { isLoggedIn } = store.auth;
  const options = allEntries.map((entry, index) => ({text: entry, value: index + 1}))

  return (
    <div className={styles.homeHeaderWrapper}>
      <Logo />
      <Link href={isLoggedIn ? '/entry/create' : '/login'}>
        <a className={styles.link}>{isLoggedIn ? 'יצירת ערך' : 'התחברות'}</a>
      </Link> 
      <SearchInput options={options} isBig={true} />
    </div>
  );
})
