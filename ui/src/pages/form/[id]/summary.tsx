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
  const [coverPicture, setCoverPicture] = useState<File>();
  const [bannerPicture, setBannerPicture] = useState<File>();
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

  const onSubmit = () => {
    console.log("submit");
    console.log("surveySummary", surveySummary);
    console.log("coverPicture", coverPicture);
    console.log("bannerPicture", bannerPicture);
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
            onSubmit={onSubmit}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.coverPictureUploadContainer}>
            <UploadImg
              title="Cover Picture"
              file={coverPicture}
              setFile={setCoverPicture}
            />
          </div>
          <div className={styles.bannerPictureUploadContainer + " mt-4"}>
            <UploadImg
              title="Banner Picture"
              file={bannerPicture}
              setFile={setBannerPicture}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Summary;
