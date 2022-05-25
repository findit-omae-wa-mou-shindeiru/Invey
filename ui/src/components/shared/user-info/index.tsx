import styles from './index.module.css';

const UserInfo = () => {
  const user = {
    name: 'John Doe',
    avatar: '/avatar.png',
    job: 'Software Engineer',
  };
  
  return (
    <div
      className={
        styles.content +
        ' d-flex align-items-center'
      }
    >
      <div className={styles.iconContainer}>
        <img
          src={user.avatar}
          alt="user avatar"
        />
      </div>
      <div
        className={
          styles.identityContainer + ' ms-3 me-4'
        }
      >
        <div className={styles.name}>
          {user.name}
        </div>
        <div className={styles.job}>
          {user.job}
        </div>
      </div>
      <div className={styles.notifications}>
        <img
          src="/notif-icon.svg"
          alt="notif icon"
        />
      </div>
    </div>
  );
};

export default UserInfo;
