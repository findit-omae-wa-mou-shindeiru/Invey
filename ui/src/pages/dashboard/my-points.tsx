import { Dashboard } from "layout";
import styles from "styles/dashboard/my-points.module.css";
import { useState, useEffect } from "react";
import { TopUpForm, RedeemForm, Loading } from "components";
import { ApiProxy } from "services";

const MyPoints = () => {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const topUpPoint = (nominal: number) => {
    editRewardPoints(nominal);
  };

  const redeemPoint = (nominal: number) => {
    editRewardPoints(-1 * nominal);
  };

  const fetchPoint = async () => {
    setLoading(true);
    const { res, err } = await ApiProxy.getInstance().get("user/profile");

    if (err || !res) {
      if(err.response.data) {
        alert(err.response.data)
      } else {
        alert(err);
      }
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setPoints(data.reward_point);
    setLoading(false);
  };

  const editRewardPoints = async (nominal: number) => {
    setLoading(true);
    const { res, err } = await ApiProxy.getInstance().post(
      "user/reward-point",
      {
        point: nominal,
      }
    );

    if (err || !res) {
      if(err.response.data) {
        alert(err.response.data)
      } else {
        alert(err);
      }
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setPoints(data.reward_point);
    setLoading(false);
  };

  useEffect(() => {
    fetchPoint();
  }, []);

  return (
    <Dashboard>
      <>
        {loading && <Loading />}
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
              <div className={styles.pointsNumber}>
                {points ? points : "..."}
              </div>
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
      </>
    </Dashboard>
  );
};

export default MyPoints;
