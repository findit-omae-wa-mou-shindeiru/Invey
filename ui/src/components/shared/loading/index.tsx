import Spinner from "react-bootstrap/Spinner";
import styles from "./index.module.css";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div
        className={
          styles.container + " d-flex justify-content-center align-items-center"
        }
      >
        <Spinner className="w-100 h-100" animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default Loading;
