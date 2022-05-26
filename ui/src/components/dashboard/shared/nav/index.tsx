import styles from './index.module.css';
import Hamburger from 'hamburger-react';
import { UserInfo } from 'components';

const Nav = ({
  open,
  showSidebar,
}: {
  open: () => void;
  showSidebar: boolean;
}) => {
  return (
    <div
      className={
        styles.container +
        ' d-flex justify-content-between pe-4'
      }
    >
      <div>
        <div className="d-block d-xxl-none">
          {!showSidebar && (
            <Hamburger
              toggle={open}
              toggled={false}
            />
          )}
        </div>
      </div>
      <UserInfo />
    </div>
  );
};

export default Nav;
