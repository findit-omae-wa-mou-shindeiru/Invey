import { Form } from "layout";
import styles from "styles/form/summary.module.css";
import { UploadImg, SurveySummaryForm } from "components";
import { useState, useEffect } from "react";
import { ISurveySummary } from "interfaces";
import { Loading } from "components";
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
  const [coverPicture, setCoverPicture] = useState<File>();
  const [bannerPicture, setBannerPicture] = useState<File>();
  const [surveySummary, setSurveySummary] =
    useState<ISurveySummary>(defaultSurveySummary);
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState<boolean>();
  const [totalResp, setTotalResp] = useState<number>();

  const router = useRouter();
  console.log(router.query);

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
    const { id } = router.query;

    const { res, err } = await ApiProxy.getInstance().put(
      `survey/${id}`,
      surveySummary
    )!;

    if (err || !res) {
      if (err.response.data) {
        alert(err.response.data);
      } else {
        alert(err);
      }
      return;
    }

    if (res.status == 200) {
      alert("Successfully updated form");
    }
  };

  const fetchIsPublished = async () => {
    const { id } = router.query;
    const { res, err } = await ApiProxy.getInstance().get("survey/" + id);

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    // console.log("isPublished", data);
    setIsPublished(data.is_published);
  };

  const fetchStatusForm = async () => {
    const { id } = router.query;
    const { res, err } = await ApiProxy.getInstance().get(
      "survey-answer-count/" + id
    );

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setTotalResp(data.count);
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchIsPublished(), fetchStatusForm()]);
    setLoading(false);
  };

  useEffect(() => {
    if (router.query?.id) {
      fetchAll();
    }
  }, [router]);

  return (
    <Form>
      <>
        <div className={styles.container + " d-flex"}>
          {loading && <Loading />}
          <div
            className={
              styles.leftContainer + " d-flex flex-column align-items-center"
            }
          >
            <div className={styles.statusContainer}>
              <h1>Survey Status</h1>
              <h2 className="px-3">{isPublished ? "Published" : "Draft"}</h2>
            </div>
            <div className={styles.totalResponseContainer}>
              <h1>Total Response</h1>
              <h2 className="px-3">{totalResp}</h2>
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
        <div
          className={
            styles.btnContainer + " mt-3 mb-5 me-5 d-flex justify-content-end"
          }
        >
          <button onClick={onSubmit} className="btn btn-success btn-lg">
            Publish
          </button>
        </div>
      </>
    </Form>
  );
};

export default Summary;
