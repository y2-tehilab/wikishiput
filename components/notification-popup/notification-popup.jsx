import styles from './notification-popup.module.scss';

export default function NotificationPopup({ isVisible, children }) {
  return (
    <div
      className={`${styles.notificationPopup} ${isVisible && styles.visible}`}
    >
      {children}
    </div>
  );
}
