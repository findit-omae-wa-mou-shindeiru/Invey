import styles from './index.module.css';
import { IContent } from 'interfaces';
import Link from 'next/link';
import { useState } from 'react';

const Auth = ({
  content,
}: {
  content: IContent;
}) => {
  const initialState = content.inputs.map(
    ({ defaultValue }) => {
      return {
        value: defaultValue,
      };
    },
  );

  const [states, setStates] =
    useState(initialState);

  const onSubmit = () => {
    const res = {};
    states.forEach(({ value }, idx) => {
      const key = content.inputs[idx].key;
      Object.assign(res, { [key]: value });
    });
    content.onSubmit(res);
    setStates(initialState);
  };

  return (
    <div
      className={
        styles.container +
        ' page d-flex flex-column flex-md-row'
      }
    >
      <div
        className={
          styles.leftContainer +
          ' w-100 w-md-50 d-flex align-items-center d-md-block'
        }
      >
        <div className="p-5 d-flex flex-column justify-content-center h-100 w-100">
          <div className={styles.leftTitle}>
            <h2 className={styles.subtitle}>
              {content.subtitle}
            </h2>
            <h1 className={styles.title}>
              {content.title}
            </h1>
          </div>
          <form className={styles.form}>
            {content.inputs.map((input, idx) => {
              return (
                <div
                  className={styles.formGroup}
                  key={input.key}
                >
                  <input
                    value={states[idx].value}
                    onChange={(e) => {
                      const newState = [
                        ...states,
                      ];
                      newState[idx].value =
                        e.target.value;
                      setStates(newState);
                    }}
                    type={input.type}
                    placeholder={
                      input.placeholder
                    }
                  />
                </div>
              );
            })}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                type="submit"
                className={styles.btnSubmit}
              >
                {content.btn}
              </button>
            </div>
          </form>
          <div
            className={
              styles.footer + ' text-end mt-2'
            }
          >
            {content.linkLbl1}
            <Link href={content.link}>
              <a className={styles.link}>
                {content.linkLbl2}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' w-100 w-md-50 d-flex flex-column justify-content-center align-items-center p-4'
        }
      >
        <img
          src="/auth-icon.svg"
          alt="auth icon"
        />
      </div>
    </div>
  );
};

export default Auth;
