import styles from "styles/plan.module.css";
import { useState } from "react";
import { IPlanOption } from "interfaces";

const leftContentListItems = [
  "Unlimited Audience",
  "Unlimited Surveys",
  "No Ads Experiences",
];

const planOptions: IPlanOption[] = [
  {
    title: "Yearly",
    desc: "Pay for a full year",
    price: 960,
    unitPrice: "yr",
    code: "YEARLY",
  },
  {
    title: "Monthly",
    desc: "Pay monthly, cancel anytime",
    price: 20,
    unitPrice: "mo",
    code: "MONTHLY",
  },
];

const Plan = () => {
  const [activeTab, setActiveTab] = useState<IPlanOption>();

  const makePayment = (planOption: IPlanOption) => {
    console.log("make payment");
    setActiveTab(undefined);
  };

  return (
    <div className={styles.container + " page"}>
      <div className={styles.iconContainer}>
        <img src="/plan-icon.svg" alt="plan icon" />
      </div>
      <div
        className={
          styles.contentContainer +
          " position-absolute d-flex justify-content-center"
        }
      >
        <div className={styles.leftContentContainer}>
          <div className={styles.leftContentTitleContainer + " d-flex"}>
            <div className={styles.leftContentTitleIconContainer}>
              <img src="/check-icon.svg" alt="upgrade icon" />
            </div>
            <div className={styles.leftContentTitle + " ms-3"}>
              Upgrade To Premium
            </div>
          </div>
          <div
            className={
              styles.leftContentDescContainer +
              " mt-3 d-flex align-items-center"
            }
          >
            You can get more out of it. Upgrade to Premium and get all features.
          </div>
          <div className={styles.leftContentList + " mt-3"}>
            {leftContentListItems.map((item, idx) => {
              return (
                <div
                  className={styles.leftContentItem + " d-flex mb-2"}
                  key={idx}
                >
                  <div className={styles.leftContentItemIconContainer}>
                    <img src="/check-icon-regular.svg" alt="check icon" />
                  </div>
                  <div
                    className={
                      styles.leftContentItemDesc +
                      " ms-2 d-flex align-items-center"
                    }
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.rightContentContainer}>
          <div className={styles.rightContentTitleContainer + " text-center"}>
            Choose Your Plan
          </div>
          <div className={styles.plansContainer}>
            {planOptions.map((planOption, idx) => {
              return (
                <div
                  className={
                    styles.planContainer +
                    " mt-3 d-flex justify-content-between btn text-start " +
                    (activeTab?.code === planOption.code
                      ? styles.activePlanContainer
                      : "")
                  }
                  onClick={() => {
                    setActiveTab(planOption);
                  }}
                  key={idx}
                >
                  <div className={styles.planDescContainer}>
                    <div className={styles.planDescTitle}>
                      {planOption.title}
                    </div>
                    <div className={styles.planDescDetail}>
                      {planOption.desc}
                    </div>
                  </div>
                  <div className={styles.planPriceContainer + " d-flex"}>
                    <div className={styles.planPriceIconContainer}>
                      <img src="/point-icon.svg" alt="point icon" />
                    </div>
                    <div
                      className={
                        styles.planPrice + " d-flex align-items-center"
                      }
                    >
                      {planOption.price}/{planOption.unitPrice}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={
              styles.rightContentBtnContainer +
              " mt-5 d-flex justify-content-center"
            }
          >
            <button disabled={!activeTab} className="btn">Make Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
