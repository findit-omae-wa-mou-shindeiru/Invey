import Link from 'next/link';
import styles from './index.module.css';
import { ISurveyBox } from 'interfaces';
import { useRouter } from 'next/router';
import { ApiProxy } from 'services';
import { useState } from 'react';

const SurveyBox = ({
  data,
  buttonLabel,
  buttonCallback
}: {
  data: ISurveyBox;
  buttonLabel: string;
  buttonCallback: () => void;
}) => {
  return (
    <div
      className={
        styles.container + ' d-flex mb-3'
      }
    >
      <div
        className={styles.imgContainer + ' me-4'}
      >
        <img
          src={data.img}
          alt={data.title + ' icon'}
        />
      </div>
      <div
        className={
          styles.content + ' d-flex flex-column'
        }
        style={{
          width:"100%"
        }}
      >
        <div className={styles.title + " mb-3"}>
          {data.title}
        </div>
        <div className={styles.desc + " mb-2"}>
          {data.description}
        </div>
        <div
          className={
            styles.bottomContainer +
            ' d-flex justify-content-between align-items-end'
          }
        >
          <div className={styles.stats}>
            <div
              className={
                styles.rewards +
                ' d-flex align-items-center'
              }
            >
              <div
                className={
                  styles.rewardsIconContainer
                }
              >
                <img
                  src="/rewards.svg"
                  alt="rewards"
                />
              </div>
              <div>{`Rewards\t: ${data.rewards}`}</div>
            </div>
            <div
              className={
                styles.estTime +
                ' d-flex align-items-center'
              }
            >
              <div
                className={
                  styles.estTimeIconContainer
                }
              >
                <img
                  src="/est-time.svg"
                  alt="est time"
                />
              </div>
              <div>{`Est. Time\t: ${data.estTime}`}</div>
            </div>
          </div>
          <div
            className={
              styles.btnContainer +
              ' d-flex justify-content-center align-items-center'
            }
            onClick={buttonCallback}
          >
            <div style={{"cursor":"pointer"}}>{buttonLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBox;
