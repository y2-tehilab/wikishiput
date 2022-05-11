import SearchInput from '../../../components/search-input/search-input';
import Logo from '../../../components/logo/logo';
import styles from './home-header.module.scss';
import Link from 'next/link';
import { useStore } from '../../../store';
import { observer } from 'mobx-react-lite';

export default observer(function HomeHeader({allEntries, onSearch}) {
  const store = useStore();
  const { isLoggedIn } = store.auth;
  const options = allEntries.map(({item1, item2}) => ({text: item2, value: item1}))

  return (
    <div className={styles.homeHeaderWrapper}>
      <Logo />
      <Link href={isLoggedIn ? '/entry/create' : '/login'}>
        <a className={styles.link}>{isLoggedIn ? 'יצירת ערך' : 'התחברות'}</a>
      </Link> 
      <SearchInput options={options} isBig={true} searchClicked={onSearch}/>
    </div>
  );
})
