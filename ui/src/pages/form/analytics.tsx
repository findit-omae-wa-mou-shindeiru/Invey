import { Form } from "layout";
import styles from "styles/form/analytics.module.css";
import { useState } from "react";
import { AnalyticsSidebar } from "components";

const analyticsOptions = [
  {
    label: "Overview",
    code: "overview",
  },
  {
    label: "Questions",
    code: "questions",
  },
  {
    label: "Individual",
    code: "individual",
  },
];

const Analytics = () => {
  const [analyticsOption, setAnalyticsOption] = useState(analyticsOptions[0]);

  const onChangeOption = (code: string) => {
    const option = analyticsOptions.find((o) => o.code === code);
    if (option && option.code !== analyticsOption.code) {
      setAnalyticsOption(option);
    }
  };

  return (
    <Form>
      <div className={styles.container + " d-flex"}>
        <AnalyticsSidebar
          options={analyticsOptions}
          onChangeOption={onChangeOption}
        />
        <div className={styles.contentContainer}>
          Content: {analyticsOption.label}
        </div>
      </div>
    </Form>
  );
};

export default Analytics;
