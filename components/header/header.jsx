import Logo from '../logo/logo';
import SearchInput from '../search-input/search-input';
import styles from './header.module.scss';

export default function Header({allEntries}) {
  const options = allEntries.map(({item1, item2}) => ({text: item2, value: item1}))

  return (
    <div className={styles.header}>
      <Logo />
      <SearchInput options={options} />
    </div>
  );
}
