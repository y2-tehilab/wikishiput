import Logo from '../logo/logo';
import SearchInput from '../search-input/search-input';
import styles from './header.module.scss';


export default function Header() {
  const options = [
    {
      value: 1,
      text: 'שופט1',
    },
    {
      value: 2,
      text: 'שופט12',
    },
    {
      value: 3,
      text: 'שופט3',
    },
    {
      value: 4,
      text: 'שופט4',
    },
    {
      value: 5,
      text: 'שופט5',
    },
  ];

  return (
    <div className={styles.header}>
      <Logo />
      <SearchInput options={options} />
    </div>
  );
}
