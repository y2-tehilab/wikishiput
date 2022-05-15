import styles from './page-loader.module.scss';

export default function PageLoader() {
  return <div className={styles.pageLoader}>
    <div className={`${styles.balls} ${styles.ball1}`}></div>
    <div className={`${styles.balls} ${styles.ball2}`}></div>
    <div className={`${styles.balls} ${styles.ball3}`}></div>
  </div>;
}
