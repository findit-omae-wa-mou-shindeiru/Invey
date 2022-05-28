import { useEffect, useState } from "react";
import { Dashboard } from "layout";
import styles from "styles/dashboard/explore.module.css";
import { SurveyBox, FilterSelection } from "components";
import { ISurveyBox, IFilterSelection, IFilterOptions } from "interfaces";
import { ApiProxy } from "services";
import { useRouter } from "next/router";
import { Loading } from "components";

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
  const [filters, setFilters] = useState<IFilterOptions>();

  const getInitialData = async (filter: any) => {
    //TODO: do filter input says
    const { res, err } = await ApiProxy.getInstance().post(
      "survey/filters",
      filter
    );

    if (err || !res) {
      alert(err);
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
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    // console.log("data filter", data);
    const filterOptions: IFilterSelection[] = Object.keys(data).map((key) => {
      return {
        label: key,
        type: "dropdown",
        options: data[key].map((option: any) => {
          return {
            label: option.name,
            id: option.id,
          };
        }),
        checked: [] as number[],
      };
    });
    setFilters({
      checkbox: filterOptions,
      inputNumber: [
        {
          label: "Lower bound reward",
          key: "lower_bound_reward_point",
          value: null as number | null,
        },
        {
          label: "Upper bound reward",
          key: "higher_bound_reward_point",
          value: null as number | null,
        },
      ],
    });
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([getInitialData(defaultFilter()), fetchFilter()]);
    setLoading(false);
  };

  const onApplyFilter = async (filters: IFilterOptions) => {
    setLoading(true);
    const preprocessedFilters = {};

    filters.checkbox.forEach((filter: IFilterSelection) => {
      preprocessedFilters[filter.label + "_id"] = filter.checked;
    });
    filters.inputNumber.forEach(
      (filter: { label: string; key: string; value: number | null }) => {
        console.log("inputNumber", filter);
        if (filter.value) {
          preprocessedFilters[filter.key] = filter.value;
        } else {
          if (filter.key === "lower_bound_reward_point") {
            preprocessedFilters[filter.key] = 0;
          } else {
            preprocessedFilters[filter.key] = Number.MAX_SAFE_INTEGER;
          }
        }
      }
    );
    await getInitialData(preprocessedFilters);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Dashboard>
      <div className={styles.container + " mt-3 d-flex"}>
        {loading && <Loading />}
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
                      alert(err);
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
        {filters && (
          <FilterSelection filters={filters} onApply={onApplyFilter} />
        )}
      </div>
    </Dashboard>
  );
};

export default Explore;
