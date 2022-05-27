import { Dashboard } from "layout";
import styles from "styles/dashboard/my-points.module.css";
import { useState } from "react";
import { TopUpForm, RedeemForm } from "components";

const MyPoints = () => {
  const [points, setPoints] = useState<number | null>(null);

  const topUpPoint = (nominal: number) => {
    setPoints((points ? points : 0) + nominal);
  };

  const redeemPoint = (nominal: number) => {
    setPoints((points ? points : 0) - nominal);
  };

  return (
    <Dashboard>
      <div className={styles.container}>
        <div
          className={
            styles.pointsInfoContainer + " mt-3 d-flex align-items-center"
          }
        >
          <div className={styles.descInfo}>My Points: </div>
          <div
            className={
              styles.pointsNumberContainer + " ms-3 d-flex align-items-center"
            }
          >
            <div className={styles.imgContainer}>
              <img src="/rewards.svg" alt="rewards icon" />
            </div>
            <div className={styles.pointsNumber}>{points ? points : "..."}</div>
          </div>
        </div>
        <div
          className={
            styles.formContainer + " mt-4 d-flex justify-content-between"
          }
        >
          <TopUpForm onVerify={(nominal) => topUpPoint(nominal)} />
          <RedeemForm onTransfer={(nominal) => redeemPoint(nominal)} />
        </div>
      </div>
    </Dashboard>
  );
};

export default MyPoints;
