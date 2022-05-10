import Link from 'next/link';
import { useState } from 'react';
import styles from './search-input.module.scss';

export default function SearchInput({ options, isBig }) {
  const [sortedOptions, setSortedOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [searchText, setSearchText] = useState('');

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

  const toggleFocus = () => {
    setIsOpen(!isOpen);
    if (isOpen) setSortedOptions(options);
  };

  const selectOption = (newValue) => {
    setValue(newValue);
    if (newValue !== value) {
      setSearchText(
        options?.find((option) => option.value == newValue)?.text || ''
      );
      toggleFocus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('search', searchText);
      toggleFocus();
    }
  };

  const handleKeyDownButton = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`${styles.searchInputBox} ${
        isBig ? styles.big : styles.small
      }`}
    >
      <button
        className={`${styles.searchBox} ${isOpen ? styles.open : ''}`}
        onClick={toggleFocus}
        onKeyDown={handleKeyDownButton}
      >
        <input
          className={styles.searchInput}
          type="text"
          placeholder="חפש שופט"
          value={searchText}
          onChange={(event) => sortOptions(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {sortedOptions.map((option) => (
            <li
              key={`option_${option.value}`}
              className={`${styles.option} ${
                value === option.value ? styles.selected : ''
              }`}
              onClick={() => selectOption(option.value)}
            >
              <Link href={`/entry?id=${option.value}`} passHref>
                {option.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
