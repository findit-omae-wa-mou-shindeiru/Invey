import { Form } from "layout";
import styles from "styles/form/summary.module.css";
import { UploadImg, SurveySummaryForm } from "components";
import { useState } from "react";
import { ISurveySummary } from "interfaces";
import { ApiProxy } from "services";
import { useRouter } from "next/router";

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
  reward_point: 0,
  max_answer: 0,
  target: [],
};

const Summary = () => {
  const router = useRouter()
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

  const onSubmit = async () => {
    console.log("surveySummary", surveySummary);
    const {id} = router.query

    const { res, err } = await ApiProxy.getInstance().put(
      `survey/${id}`,
      surveySummary
    )!;

    if(err || !res){
      if(err.response.data) {
        alert(err.response.data)
      } else {
        alert(err);
      }
      return
    }

    if(res.status == 200) {
      alert("Successfully updated form")
    }
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
