import styles from './button-loader.module.scss';

export default function ButtonLoader({ text, onClick, isLoading }) {
  return (
    <button className={styles.buttonLoader} onClick={onClick}>
      {isLoading ? (
        <span className={styles.load}></span>
      ) : (
        <p className={styles.buttonText}>{text}</p>
      )}
    </button>
  );
}
