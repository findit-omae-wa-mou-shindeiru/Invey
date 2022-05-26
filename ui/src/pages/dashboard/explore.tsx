import { useState } from 'react';
import { Dashboard } from 'layout';
import styles from 'styles/dashboard/explore.module.css';
import {
  SurveyBox,
  FilterSelection,
} from 'components';
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

const filters = [
  {
    label: 'Categories',
    options: [
      {
        label: 'All',
      },
      {
        label: 'Category 1',
      },
      {
        label: 'Category 2',
      },
      {
        label: 'Category 3',
      },
    ],
  },
  {
    label: 'Audience',
    options: [
      {
        label: 'All',
      },
      {
        label: 'Student',
      },
      {
        label: 'Workers',
      },
      {
        label: 'General',
      },
    ],
  },
  {
    label: 'Gender',
    options: [
      {
        label: 'All',
      },
      {
        label: 'Male',
      },
      {
        label: 'Female',
      },
    ],
  },
  {
    label: 'Rewards Point',
    options: [
      {
        label: 'Under 10 points',
      },
      {
        label: '10 to 50 points',
      },
      {
        label: '50 to 100 points',
      },
    ],
  },
];

const Explore = () => {
  const [query, setQuery] = useState('');

  return (
    <Dashboard>
      <div
        className={
          styles.container + ' mt-3 d-flex'
        }
      >
        <div className={styles.rightContainer}>
          <div
            className={
              styles.topRightContainer + ' mb-4'
            }
          >
            <div
              className={
                styles.titleContainer + ' mb-4'
              }
            >
              <h1>Get Started Now</h1>
            </div>

            <div
              className={styles.searchContainer}
            >
              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search"
              />
            </div>
          </div>
          <div
            className={styles.surveyBoxContainer}
          >
            {data.map((datum) => {
              return (
                <SurveyBox
                  data={datum}
                  key={datum.id}
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
