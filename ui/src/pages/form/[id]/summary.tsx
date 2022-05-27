import { Form } from "layout";
import styles from "styles/form/summary.module.css";
import { UploadImg, SurveySummaryForm } from "components";
import { useState } from "react";
import { ISurveySummary } from "interfaces";

const getStatusText = (status: string) => {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "COMPLETED":
      return "Completed";
  }
};

const defaultSurveySummary: ISurveySummary = {
  title: "Untitled Survey",
  description: "Description",
  rewardPoint: 0,
  target: [],
};

const Summary = () => {
  const [file, setFile] = useState<File | undefined>();
  const [surveySummary, setSurveySummary] =
    useState<ISurveySummary>(defaultSurveySummary);

  const data = {
    surveyId: "123",
    surveyStatus: "DRAFT",
    totalResponse: 120,
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    estTime: "2mins",
  };

  return (
    <Form>
      <div className={styles.container + " d-flex"}>
        <div
          className={
            styles.leftContainer + " d-flex flex-column align-items-center"
          }
        >
          <div className={styles.statusContainer}>
            <h1>Survey Status</h1>
            <h2>{getStatusText(data.surveyStatus)}</h2>
          </div>
          <div className={styles.totalResponseContainer}>
            <h1>Total Response</h1>
            <h2>{data.totalResponse}</h2>
          </div>
        </div>
        <div
          className={
            styles.middleContainer + " d-flex flex-column align-items-center"
          }
        >
          <SurveySummaryForm
            surveySummary={surveySummary}
            setSurveySummary={setSurveySummary}
          />
          {/* <div className={styles.formContainer + " d-flex"}>
            <div className={styles.imgContainer}>
              <img src="/mock-survey-icon.png" alt="survey icon" />
            </div>
            <div className={styles.infoContainer}>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
              <div className={styles.stats}>
                <div className={styles.rewards + " d-flex align-items-center"}>
                  <div className={styles.rewardsIconContainer}>
                    <img src="/rewards.svg" alt="rewards" />
                  </div>
                  <div>{`Rewards\t: ${data.rewards}`}</div>
                </div>
                <div className={styles.estTime + " d-flex align-items-center"}>
                  <div className={styles.estTimeIconContainer}>
                    <img src="/est-time.svg" alt="est time" />
                  </div>
                  <div>{`Est. Time\t: ${data.estTime}`}</div>
                </div>
              </div>
            </div>
            <div className={styles.editContainer}>
              <Link href={`/fill-form/${data.surveyId}`}>
                <a>
                  <div className={styles.editIconContainer}>
                    <img src="/edit-icon.svg" alt="edit btn" />
                  </div>
                </a>
              </Link>
            </div>
          </div> */}
        </div>
        <div className={styles.rightContainer}>
          <UploadImg title={"Cover Pictures"} file={file} setFile={setFile} />
        </div>
      </div>
    </Form>
  );
};

export default Summary;
