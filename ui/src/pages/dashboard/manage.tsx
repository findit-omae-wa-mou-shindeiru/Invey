import { Dashboard } from 'layout';
import {
  SurveyBox,
  SurveyChart,
  StatsSummary,
} from 'components';
import styles from 'styles/dashboard/manage.module.css';
import { ISurveyBox } from 'interfaces';
import { useEffect, useState } from 'react';
import { ApiProxy } from 'services';
import { useRouter } from 'next/router';

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
  const [surveyData, setSurveyData] = useState<ISurveyBox[]>([])
  const router = useRouter()

  useEffect(()=>{
    const getInitialData = async () => {
      //TODO: do filter input says
      const {res, err} = await ApiProxy.getInstance().get("user/surveys");

      if(err || !res) {
        alert(err)
        return
      }

      const dataProcessed : ISurveyBox[] = res.data.map((singleData:any) => ({
        title: singleData.title,
        description: singleData.description,
        rewards: singleData.reward_point,
        id: singleData.id,
        estTime: "1 min",
        img: "/mock-survey-icon.png"
      }))

      setSurveyData(dataProcessed)
    }
    getInitialData()
  },[])

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
              Your Surveys
            </div>
            <div
              className={
                styles.recentSurveyContent
              }
            >
              {surveyData.map((datum) => {
                return (
                  <SurveyBox
                    key={datum.id}
                    data={datum}
                    buttonLabel="Edit now"
                    buttonCallback={()=>{
                      router.push(`/form/${datum.id}/summary`)
                    }}
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
