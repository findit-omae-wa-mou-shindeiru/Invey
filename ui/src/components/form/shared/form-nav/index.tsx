import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { UserInfo } from "components";

const navItems = [
  {
    label: "Summary",
    link: "summary",
  },
  {
    label: "Survey",
    link: "survey",
  },
  {
    label: "Analytics",
    link: "analytics",
  },
];

const linkNav = (idx: number, id: string | string[] | undefined) => {
  return `/form/${id}/${navItems[idx].link}`;
};

const FormNav = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <div
        className={
          styles.topContainer +
          " d-flex justify-content-between align-items-center"
        }
      >
        <div className={styles.topLeftContainer}>
          <img src="/logo-white.png" alt="logo" />
        </div>
        <div className={styles.topRightContainer}>
          <UserInfo />
        </div>
      </div>
      <div
        className={
          styles.bottomContainer +
          " d-flex justify-content-around align-items-center"
        }
      >
        {navItems.map((item, idx) => {
          const arrPath = router.pathname.split("/");
          return (
            <div
              key={item.link}
              className={
                styles.navItem +
                " " +
                (arrPath[arrPath.length - 1] === item.link
                  ? styles.navItemActive
                  : "")
              }
            >
              <Link href={linkNav(idx, id)}>
                <a>{item.label}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormNav;
