import { removeArgumentsFromDocument } from "@apollo/client/utilities";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ApiProxy } from "services";
import styles from "./index.module.css";
import { Loading } from "components";

const StatsSummary = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [quickStats, setQuickStats] = useState<{
    totalSurvey: number;
    totalAnswer: number;
  }>();
  const [userData, setUserData] = useState<{
    isPremium: boolean;
    rewardPoint: number;
  }>();

  const fetchQuickStats = async () => {
    const { res, err } = await ApiProxy.getInstance().get("user/survey-stats");

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setQuickStats({
      totalSurvey: data.total_survey,
      totalAnswer: data.total_answer,
    });
  };

  const fetchUserData = async () => {
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
    setUserData({
      isPremium: data.is_premium,
      rewardPoint: data.reward_point,
    });
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchQuickStats(), fetchUserData()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className={styles.container + " ms-4"}>
      {loading && <Loading />}
      <div className={styles.status + " mb-3"}>
        <div className={styles.statusTitle}>
          <h1>Status</h1>
        </div>
        <Link href="/plan">
          <div className={styles.statusCard + " d-flex btn text-start"}>
            <div className={styles.statusIconContainer}>
              <img src="/star.svg" alt="star icon" />
            </div>
            <div
              className={
                styles.statusDetail +
                " d-flex flex-column justify-content-center"
              }
            >
              <h1>{userData?.isPremium ? "Premium" : "Free Plan"}</h1>
              <h2>{userData?.isPremium ? "Activated" : "Activate Premium"}</h2>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.create + " mb-3"}>
        <div className={styles.createTitle}>
          <h1>Create Survey</h1>
        </div>
        <div
          className={styles.createCard + " d-flex"}
          style={{
            cursor: "pointer",
          }}
          onClick={async () => {
            const { res, err } = await ApiProxy.getInstance().get(
              "create-initial-survey"
            );

            if (err || !res) {
              alert(err);
              return;
            }

            router.push(`/form/${res.data.id}/summary`);
          }}
        >
          <div className={styles.createIconContainer}>
            <img src="/add-icon.svg" alt="create icon" />
          </div>
          <div
            className={
              styles.createDetail + " d-flex flex-column justify-content-center"
            }
          >
            <h1>Create</h1>
            <h2>New Survey</h2>
          </div>
        </div>
      </div>
      <div className={styles.points + " mb-3"}>
        <div className={styles.pointsTitle}>
          <h1>Points</h1>
        </div>
        <div className={styles.pointsItems + " d-flex text-center"}>
          <div className={styles.pointsCard}>
            <div className={styles.pointsIconContainer}>
              <img src="/point-icon.svg" alt="point icon" />
            </div>
            <div className={styles.pointsDetails}>
              <h2>{userData?.rewardPoint} points</h2>
            </div>
          </div>
          <div className={styles.topupCard}>
            <div className={styles.topupIconContainer}>
              <img src="/topup-icon.svg" alt="topup icon" />
            </div>
            <div className={styles.topupDetails}>
              <h2>Top Up</h2>
            </div>
          </div>
          <div className={styles.redeemCard}>
            <div className={styles.redeemIconContainer}>
              <img src="/redeem-icon.svg" alt="redeem icon" />
            </div>
            <div className={styles.redeemDetails}>
              <h2>Redeem</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.quickStats + " mb-3"}>
        <div className={styles.quickStatsTitle}>
          <h1>Quick Stats</h1>
        </div>
        <div className={styles.quickStatsItems}>
          <div className={styles.createdSurveyCard + " d-flex"}>
            <div className={styles.createdSurveyIconContainer}>
              <img src="/survey-stats-icon.svg" alt="survey stats icon" />
            </div>
            <div className={styles.createdSurveyDetails}>
              <h1>
                {quickStats?.totalSurvey ? quickStats.totalSurvey : 0} Surveys
              </h1>
              <h2>Created</h2>
            </div>
          </div>
          <div className={styles.audienceCard + " d-flex"}>
            <div className={styles.audienceIconContainer}>
              <img src="/survey-stats-icon.svg" alt="survey stats icon" />
            </div>
            <div className={styles.audienceDetails}>
              <h1>
                {quickStats?.totalAnswer ? quickStats.totalAnswer : 0} Audience
              </h1>
              <h2>Reached</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
