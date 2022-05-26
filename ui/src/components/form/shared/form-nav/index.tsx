import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { UserInfo } from 'components';

const FormNav = () => {
  const navItems = [
    {
      label: 'Summary',
      link: '/form/summary',
    },
    {
      label: 'Survey',
      link: '/form/survey',
    },
    {
      label: 'Analytics',
      link: '/form/analytics',
    },
  ];

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div
        className={
          styles.topContainer +
          ' d-flex justify-content-between align-items-center'
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
          ' d-flex justify-content-around align-items-center'
        }
      >
        {navItems.map((item) => {
          return (
            <div
              key={item.link}
              className={
                styles.navItem +
                ' ' +
                (router.pathname === item.link
                  ? styles.navItemActive
                  : '')
              }
            >
              <Link href={item.link}>
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
