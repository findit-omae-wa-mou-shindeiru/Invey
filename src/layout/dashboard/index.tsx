import { Sidebar, Nav } from 'components';
import styles from './index.module.css';
import { useState } from 'react';

const Dashboard = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [showSidebar, setShowSidebar] =
    useState(false);

  return (
    <div
      className={
        styles.container + ' page d-flex'
      }
    >
      <Sidebar
        show={showSidebar}
        close={() => setShowSidebar(false)}
      />
      <div
        className={
          styles.main +
          ' pt-4 px-4 d-flex flex-column'
        }
      >
        <Nav
          open={() => setShowSidebar(true)}
          showSidebar={showSidebar}
        />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
