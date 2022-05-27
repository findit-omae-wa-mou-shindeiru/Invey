import styles from "./index.module.css";
import { useState } from "react";
import { INotification } from "interfaces";

const notifs: INotification[] = [
  {
    avatar: "/avatar.png",
    message: "John Doe has filled your survey",
    time: "3 minutes ago",
  },
  {
    avatar: "/avatar.png",
    message: "Malik Akbar has filled your survey",
    time: "5 minutes ago",
  },
  {
    avatar: "/avatar.png",
    message: "John Doe has filled your survey",
    time: "3 minutes ago",
  },
  {
    avatar: "/avatar.png",
    message: "Malik Akbar has filled your survey",
    time: "5 minutes ago",
  },
  {
    avatar: "/avatar.png",
    message: "John Doe has filled your survey",
    time: "3 minutes ago",
  },
  {
    avatar: "/avatar.png",
    message: "Malik Akbar has filled your survey",
    time: "5 minutes ago",
  },
];

const UserInfo = () => {
  const [notifOpen, setNotifOpen] = useState(false);

  const user = {
    name: "John Doe",
    avatar: "/avatar.png",
    job: "Software Engineer",
  };

  return (
    <div className={styles.content + " d-flex align-items-center"}>
      <div className={styles.iconContainer}>
        <img src={user.avatar} alt="user avatar" />
      </div>
      <div className={styles.identityContainer + " ms-3 me-4"}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.job}>{user.job}</div>
      </div>
      <div
        className={
          (notifOpen ? styles.notifWrapper : "") +
          " btn d-flex justify-content-center align-items-center position-relative"
        }
        onClick={() => setNotifOpen(!notifOpen)}
      >
        <div className={styles.notifications}>
          <img src="/notif-icon.svg" alt="notif icon" />
        </div>

        {notifOpen && (
          <div className={styles.notifPopup + " position-absolute"}>
            {notifs.map((notif, index) => {
              return (
                <div
                  className={styles.notif + " d-flex align-items-center"}
                  key={index}
                >
                  <div className={styles.avatarContainer}>
                    <img src={notif.avatar} alt="avatar" />
                  </div>
                  <div className={styles.notifInfo + " ms-3 text-start"}>
                    <div className={styles.notifMsg}>{notif.message}</div>
                    <div className={styles.notifTime}>{notif.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
