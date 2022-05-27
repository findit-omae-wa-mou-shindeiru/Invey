import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { Cross } from "hamburger-react";

const Sidebar = ({
  className,
  close,
  show,
}: {
  show: boolean;
  close: () => void;
  className?: string;
}) => {
  const router = useRouter();

  const links = [
    {
      url: "/dashboard/explore",
      label: "Explore Surveys",
      img: "/explore",
    },
    {
      url: "/dashboard/manage",
      label: "Manage Surveys",
      img: "/manage",
    },
    {
      url: "/dashboard/settings",
      label: "Settings",
      img: "/settings",
    },
    {
      url: "/dashboard/my-points",
      label: "My Points",
      img: "/my-points",
    },
  ];

  return (
    <>
      <div className={styles.container + " d-none d-xxl-block"}></div>
      <div
        className={
          styles.container +
          " " +
          styles.whiteBG +
          ` ${show ? "" : "d-none"} d-xxl-block position-fixed top-0 start-0` +
          className
        }
      >
        <div className="d-flex justify-content-end d-xxl-none mt-2 px-2">
          <Cross toggled={true} toggle={close} />
        </div>
        <div className={styles.topContainer + " d-flex justify-content-center"}>
          <div className={styles.imgContainer}>
            <img src="/logo-white.png" alt="logo" />
          </div>
        </div>
        <div className={styles.linksContainer + " d-flex flex-column"}>
          {links.map((link) => {
            return (
              <Link href={link.url} key={link.url}>
                <a
                  className={
                    (router.pathname === link.url
                      ? styles.linkActive
                      : styles.link) + " px-5 py-4 mb-3"
                  }
                >
                  <div className="d-flex align-items-center">
                    <div className={styles.iconContainer}>
                      <img
                        src={
                          link.img +
                          (router.pathname === link.url
                            ? "-active"
                            : "-inactive") +
                          ".svg"
                        }
                        alt={link.label + " icon"}
                      />
                    </div>
                    <div className="ms-2">{link.label}</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
