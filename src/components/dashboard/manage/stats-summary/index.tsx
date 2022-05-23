import styles from './index.module.css';

const StatsSummary = () => {
  return (
    <div className={styles.container + ' ms-4'}>
      <div className={styles.status + ' mb-3'}>
        <div className={styles.statusTitle}>
          <h1>Status</h1>
        </div>
        <div
          className={
            styles.statusCard + ' d-flex'
          }
        >
          <div
            className={styles.statusIconContainer}
          >
            <img
              src="/star.svg"
              alt="star icon"
            />
          </div>
          <div
            className={
              styles.statusDetail +
              ' d-flex flex-column justify-content-center'
            }
          >
            <h1>Premium</h1>
            <h2>Activated</h2>
          </div>
        </div>
      </div>
      <div className={styles.create + ' mb-3'}>
        <div className={styles.createTitle}>
          <h1>Create Survey</h1>
        </div>
        <div
          className={
            styles.createCard + ' d-flex'
          }
        >
          <div
            className={styles.createIconContainer}
          >
            <img
              src="/add-icon.svg"
              alt="create icon"
            />
          </div>
          <div
            className={
              styles.createDetail +
              ' d-flex flex-column justify-content-center'
            }
          >
            <h1>Create</h1>
            <h2>New Survey</h2>
          </div>
        </div>
      </div>
      <div className={styles.points + ' mb-3'}>
        <div className={styles.pointsTitle}>
          <h1>Points</h1>
        </div>
        <div
          className={
            styles.pointsItems +
            ' d-flex text-center'
          }
        >
          <div className={styles.pointsCard}>
            <div
              className={
                styles.pointsIconContainer
              }
            >
              <img
                src="/point-icon.svg"
                alt="point icon"
              />
            </div>
            <div className={styles.pointsDetails}>
              <h2>120 points</h2>
            </div>
          </div>
          <div className={styles.topupCard}>
            <div
              className={
                styles.topupIconContainer
              }
            >
              <img
                src="/topup-icon.svg"
                alt="topup icon"
              />
            </div>
            <div className={styles.topupDetails}>
              <h2>Top Up</h2>
            </div>
          </div>
          <div className={styles.redeemCard}>
            <div
              className={
                styles.redeemIconContainer
              }
            >
              <img
                src="/redeem-icon.svg"
                alt="redeem icon"
              />
            </div>
            <div className={styles.redeemDetails}>
              <h2>Redeem</h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.quickStats + ' mb-3'}
      >
        <div className={styles.quickStatsTitle}>
          <h1>Quick Stats</h1>
        </div>
        <div className={styles.quickStatsItems}>
          <div
            className={
              styles.createdSurveyCard + ' d-flex'
            }
          >
            <div
              className={
                styles.createdSurveyIconContainer
              }
            >
              <img
                src="/survey-stats-icon.svg"
                alt="survey stats icon"
              />
            </div>
            <div
              className={
                styles.createdSurveyDetails
              }
            >
              <h1>20 Surveys</h1>
              <h2>Created</h2>
            </div>
          </div>
          <div
            className={
              styles.audienceCard + ' d-flex'
            }
          >
            <div
              className={
                styles.audienceIconContainer
              }
            >
              <img
                src="/survey-stats-icon.svg"
                alt="survey stats icon"
              />
            </div>
            <div
              className={styles.audienceDetails}
            >
              <h1>2K Audience</h1>
              <h2>Reached</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;
