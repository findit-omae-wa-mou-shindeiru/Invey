import styles from "./index.module.css";
import { ISurveySummary } from "interfaces";
import Dropdown from "react-bootstrap/Dropdown";
import NumericInput from "react-numeric-input";
import { useState } from "react";

const targetOptions: {
  label: string;
  selected?: string;
  values: {
    label: string;
  }[];
}[] = [
  {
    label: "Audience",
    values: [
      {
        label: "All",
      },
      {
        label: "Student",
      },
      {
        label: "Worker",
      },
    ],
  },
  {
    label: "Gender",
    values: [
      {
        label: "All",
      },
      {
        label: "Male",
      },
      {
        label: "Female",
      },
    ],
  },
  {
    label: "Category",
    values: [
      {
        label: "Category 1",
      },
      {
        label: "Category 2",
      },
      {
        label: "Category 3",
      },
    ],
  },
];

const SurveySummaryForm = ({
  surveySummary,
  setSurveySummary,
  onSubmit,
}: {
  surveySummary: ISurveySummary;
  setSurveySummary: (surveySummary: ISurveySummary) => void;
  onSubmit: () => void;
}) => {
  const [targets, setTargets] = useState(targetOptions);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.topForm}>
          <div className={styles.title}>
            <h1>General Information</h1>
          </div>
        </div>
        <div className={styles.contentForm}>
          <div className={styles.surveyTitle}>
            <div className={styles.formLabel}>Survey Title</div>
            <div className={styles.inputTitleContainer}>
              <input
                type="text"
                value={surveySummary.title}
                onChange={(e) => {
                  setSurveySummary({
                    ...surveySummary,
                    title: e.target.value,
                  });
                }}
                placeholder="Enter Title"
              />
            </div>
          </div>
          <div className={styles.surveyDescription}>
            <div className={styles.formLabel}>Survey Description</div>
            <div className={styles.inputDescriptionContainer}>
              <textarea
                value={surveySummary.description}
                onChange={(e) => {
                  setSurveySummary({
                    ...surveySummary,
                    description: e.target.value,
                  });
                }}
                placeholder="Enter Description"
              />
            </div>
          </div>
          <div className={styles.surveyRewards}>
            <div className={styles.formLabel}>Survey Rewards</div>
            <div className={styles.inputRewardsContainer}>
              <NumericInput
                mobile
                className={styles.inputRewards + " form-control"}
                value={surveySummary.rewardPoint}
                onChange={(value: number) => {
                  setSurveySummary({
                    ...surveySummary,
                    rewardPoint: value,
                  });
                }}
                min={0}
              />
            </div>
          </div>
          <div className={styles.surveyTarget}>
            <div className={styles.formLabel}>Survey Target</div>
            <div
              className={
                styles.inputTargetGroup +
                " d-flex flex-wrap justify-content-between"
              }
            >
              {targets.map((option, idx) => {
                return (
                  <div key={idx} className={styles.inputTarget}>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {option.selected ? option.selected : option.label}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {option.values.map((value, idxOption) => {
                          return (
                            <Dropdown.Item
                              key={idxOption}
                              onClick={() => {
                                const newTargets = [...targets];
                                newTargets[idx].selected = value.label;
                                setTargets(newTargets);
                              }}
                            >
                              {value.label}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={styles.btnContainer + " mt-5 d-flex justify-content-end"}
          >
            <button onClick={onSubmit} className="btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveySummaryForm;
