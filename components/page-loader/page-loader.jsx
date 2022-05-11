import styles from './page-loader.module.scss';

export default function PageLoader() {
  return <div className={styles.pageLoader}>
    <div class={`${styles.balls} ${styles.ball1}`}></div>
    <div class={`${styles.balls} ${styles.ball2}`}></div>
    <div class={`${styles.balls} ${styles.ball3}`}></div>
  </div>;
}
