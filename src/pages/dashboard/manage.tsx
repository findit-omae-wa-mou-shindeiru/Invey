import { Dashboard } from 'layout';
import {
  SurveyBox,
  SurveyChart,
  StatsSummary,
} from 'components';
import styles from 'styles/dashboard/manage.module.css';
import { ISurveyBox } from 'interfaces';

const data: ISurveyBox[] = [
  {
    title: 'Some Sample Survey Title',
    description:
      'In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document',
    rewards: 10,
    id: 1,
    estTime: '2 min',
    img: '/mock-survey-icon.png',
  },
  {
    title: 'Some Sample Survey Title',
    description:
      'In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document',
    rewards: 10,
    id: 2,
    estTime: '2 min',
    img: '/mock-survey-icon.png',
  },
  {
    title: 'Some Sample Survey Title',
    description:
      'In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document',
    rewards: 10,
    id: 3,
    estTime: '2 min',
    img: '/mock-survey-icon.png',
  },
  {
    title: 'Some Sample Survey Title',
    description:
      'In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document',
    rewards: 10,
    id: 4,
    estTime: '2 min',
    img: '/mock-survey-icon.png',
  },
  {
    title: 'Some Sample Survey Title',
    description:
      'In publishing and graphic design, Lorem ipsum demonstrate the visual form of a document',
    rewards: 10,
    id: 5,
    estTime: '2 min',
    img: '/mock-survey-icon.png',
  },
];

const Manage = () => {
  return (
    <Dashboard>
      <div
        className={
          styles.container + ' mt-3 d-flex'
        }
      >
        <div className={styles.rightContainer}>
          <SurveyChart />
          <div className={styles.recentSurvey}>
            <div
              className={styles.recentSurveyTitle + " mb-3"}
            >
              Recent Surveys
            </div>
            <div
              className={
                styles.recentSurveyContent
              }
            >
              {data.map((datum) => {
                return (
                  <SurveyBox
                    key={datum.id}
                    data={datum}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.leftContainer}>
          <StatsSummary />
        </div>
      </div>
    </Dashboard>
  );
};

export default Manage;
