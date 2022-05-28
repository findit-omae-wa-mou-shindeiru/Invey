import { useEffect, useState } from "react";
import { Dashboard } from "layout";
import styles from "styles/dashboard/explore.module.css";
import { SurveyBox, FilterSelection } from "components";
import { ISurveyBox } from "interfaces";
import { ApiProxy } from "services";
import { useRouter } from "next/router";
import { Loading } from "components";

const data: ISurveyBox[] = [
  {
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    id: 1,
    estTime: "2 min",
    img: "/mock-survey-icon.png",
  },
  {
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    id: 2,
    estTime: "2 min",
    img: "/mock-survey-icon.png",
  },
  {
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    id: 3,
    estTime: "2 min",
    img: "/mock-survey-icon.png",
  },
  {
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    id: 4,
    estTime: "2 min",
    img: "/mock-survey-icon.png",
  },
  {
    title: "Some Sample Survey Title",
    description:
      "In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document",
    rewards: 10,
    id: 5,
    estTime: "2 min",
    img: "/mock-survey-icon.png",
  },
];

const filters = [
  {
    label: "Categories",
    options: [
      {
        label: "All",
      },
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
  {
    label: "Audience",
    options: [
      {
        label: "All",
      },
      {
        label: "Student",
      },
      {
        label: "Workers",
      },
      {
        label: "General",
      },
    ],
  },
  {
    label: "Gender",
    options: [
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
    label: "Rewards Point",
    options: [
      {
        label: "Under 10 points",
      },
      {
        label: "10 to 50 points",
      },
      {
        label: "50 to 100 points",
      },
    ],
  },
];

const defaultFilter = () => {
  return {
    category_id: [],
    audience_id: [],
    gender_id: [],
  };
};

const Explore = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [surveyData, setSurveyData] = useState<ISurveyBox[]>([]);
  const [loading, setLoading] = useState(false);

  const getInitialData = async () => {
    //TODO: do filter input says
    const { res, err } = await ApiProxy.getInstance().post(
      "survey/filters",
      defaultFilter()
    );

    if (err || !res) {
      if(err.response.data) {
        alert(err.response.data)
      } else {
        alert(err);
      }
      return;
    }

    const dataProcessed: ISurveyBox[] = res.data.map((singleData: any) => ({
      title: singleData.title,
      description: singleData.description,
      rewards: singleData.reward_point,
      id: singleData.id,
      estTime: "1 min",
      img: "/mock-survey-icon.png",
    }));

    setSurveyData(dataProcessed);
  };

  const fetchFilter = async () => {
    const { res, err } = await ApiProxy.getInstance().get("survey-filters");

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
    console.log("data filter", data);
  };

  const fetchAll = async () => {
    await Promise.all([getInitialData(), fetchFilter()]);
  };

  useEffect(() => {
    // getInitialData();
    fetchAll();
  }, []);

  return (
    <Dashboard>
      <div className={styles.container + " mt-3 d-flex"}>
        <div className={styles.rightContainer}>
          <div className={styles.topRightContainer + " mb-4"}>
            <div className={styles.titleContainer + " mb-4"}>
              <h1>Get Started Now</h1>
            </div>

            <div className={styles.searchContainer}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
            </div>
          </div>
          <div className={styles.surveyBoxContainer}>
            {surveyData.map((datum) => {
              return (
                <SurveyBox
                  data={datum}
                  key={datum.id}
                  buttonLabel="Answer Now"
                  buttonCallback={async () => {
                    const { res, err } = await ApiProxy.getInstance().get(
                      `survey-eligibility/${datum.id}`
                    );

                    if (err || !res) {
                      console.log(res)
                      if(err.response.data) {
                        alert(err.response.data)
                      } else {
                        alert(err);
                      }
                      return;
                    }

                    if (res!.status !== 200) {
                      alert("You are uneligible to fill the form");
                      return;
                    }

                    if (res.data.valid) {
                      router.push(`/fill-form/${datum.id}`);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        <FilterSelection filters={filters} />
      </div>
    </Dashboard>
  );
};

export default Explore;
