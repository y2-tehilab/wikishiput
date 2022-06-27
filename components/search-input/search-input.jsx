import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './search-input.module.scss';

export default function SearchInput({ options, isBig, searchClicked }) {
  const defaultValue = 0;
  const [sortedOptions, setSortedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => {
    setSortedOptions(options);
  }, [options]);

  const sortOptions = (newSearchText) => {
    setSearchText(newSearchText);
    if (newSearchText) {
      setSortedOptions(
        options?.filter((option) => option?.text?.startsWith(newSearchText))
      );
    } else {
      setSortedOptions(options);
    }
  };

  const selectOption = (newValue) => {
    setValue(newValue);
    router.push(`/entry?id=${newValue}`);
    if (newValue !== value) {
      setSearchText(
        options?.find((option) => option.value === newValue)?.text || ''
      );
      setIsOpen(false);
    }
  };

  const search = () => {
    if (searchClicked) searchClicked(searchText);
    else {
      router.push(`/search?search=${searchText}`);
    }
  };
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     searchClicked?.(searchText);
  //     setIsOpen(false);
  //   }
  // };

  return (
    <div
      className={`${styles.searchInputBox} ${
        isBig ? styles.big : styles.small
      }`}
    >
      <div className={styles.searchBox}>
        <input
          className={`${styles.searchInput} ${isOpen ? styles.open : ''}`}
          type="text"
          placeholder="חפש שופט"
          value={searchText}
          onChange={(event) => sortOptions(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />
        <button
          className={`${styles.searchButton} ${isOpen && styles.visible}`}
          onMouseDown={search}
        >
          חיפוש
        </button>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {sortedOptions.map((option) => (
            <li
              key={`option-${option.value}`}
              className={`${styles.option} ${
                value === option.value ? styles.selected : ''
              }`}
              onMouseDown={() => selectOption(option.value)}
            >
              {option.text}
            </li>
          ))}
          {searchText && (
            <li
              key={`option-pages`}
              className={`${styles.option} ${styles.pageOption}`}
              onMouseDown={search}
            >
              חיפוש דפים שמכילים
              <strong> {searchText}</strong>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
