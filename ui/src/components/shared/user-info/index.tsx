import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { INotification } from "interfaces";
import { ApiProxy } from "services";

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
  const [countNotif, setCountNotif] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    job: "",
    avatar: "/avatar.png",
  });

  const fetchData = async () => {
    const { res, err } = await ApiProxy.getInstance().get("user/profile");

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setUserInfo({
      name: `${data.firstname} ${data.secondname}`,
      job: data.position.name,
      avatar: data.photo_url,
    });
  };

  const fetchCountNotif = async () => {
    const { res, err } = await ApiProxy.getInstance().get("user/profile");

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setCountNotif(data.total);
  };

  const fetchNotifs = async () => {
    const { res, err } = await ApiProxy.getInstance().get("user/read-notification");

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setNotifications(data);
  };

  const onClickNotif = async () => {
    if (notifOpen) {
      setNotifOpen(false);
      return;
    }

    await fetchNotifs();
    setNotifOpen(true);
  };

  useEffect(() => {
    fetchData();
    fetchCountNotif();
  }, []);

  return (
    <div className={styles.content + " d-flex align-items-center"}>
      <div
        className={
          styles.iconContainer +
          " d-flex align-items-center justify-content-center"
        }
      >
        <img src={userInfo.avatar} alt="user avatar" />
      </div>
      <div className={styles.identityContainer + " ms-3 me-4"}>
        <div className={styles.name}>{userInfo.name}</div>
        <div className={styles.job}>{userInfo.job}</div>
      </div>
      <div
        className={
          (notifOpen ? styles.notifWrapper : "") +
          " btn d-flex justify-content-center align-items-center position-relative"
        }
        onClick={() => onClickNotif()}
      >
        <div className={styles.notifications + " position-relative"}>
          <img src="/notif-icon.svg" alt="notif icon" />

          {countNotif > 0 && (
            <div className={styles.totalNotif + " position-absolute"}>
              {countNotif}
            </div>
          )}
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
