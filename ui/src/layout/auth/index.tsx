import styles from "./index.module.css";
import { IContent } from "interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Loading } from "components";

const Auth = ({
  content,
  submitCallback,
}: {
  content: IContent;
  submitCallback: (params: Object) => void;
}) => {
  const initialState = content.inputs.map(({ defaultValue }) => {
    return {
      value: defaultValue,
    };
  });

  const [states, setStates] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    const res = {};
    states.forEach(({ value }, idx) => {
      const key = content.inputs[idx].key;
      Object.assign(res, { [key]: value });
    });
    console.log("res", res);
    await submitCallback(res);
    setStates(initialState);
    setIsLoading(false);
  };

  return (
    <div className={styles.container + " page d-flex flex-column flex-md-row"}>
      {isLoading && <Loading />}
      <div
        className={
          styles.leftContainer +
          " w-100 w-md-50 d-flex align-items-center d-md-block"
        }
      >
        <div className="p-5 d-flex flex-column justify-content-center h-100 w-100">
          <div className={styles.leftTitle}>
            <h2 className={styles.subtitle}>{content.subtitle}</h2>
            <h1 className={styles.title}>{content.title}</h1>
          </div>
          <form className={styles.form}>
            {content.inputs.map((input, idx) => {
              return (
                <div className={styles.formGroup} key={input.key}>
                  {input.type === "dropdown" ? (
                    <Dropdown>
                      <Dropdown.Toggle id={`dropdown-${input.key}`}>
                        {states[idx]?.value
                          ? content.inputs[idx].options!.find(
                              (option) => option.id === states[idx].value
                            )!.label
                          : input.placeholder}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {content.inputs[idx].options!.map(
                          (option, innerIdx) => {
                            return (
                              <Dropdown.Item
                                key={innerIdx}
                                onClick={() => {
                                  const newState = [...states];
                                  newState[idx]?.value = option.id;
                                  setStates(newState);
                                }}
                              >
                                {option.label}
                              </Dropdown.Item>
                            );
                          }
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <input
                      value={states[idx]?.value}
                      onChange={(e) => {
                        const newState = [...states];
                        newState[idx].value = e.target.value;
                        setStates(newState);
                      }}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  )}
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
          <div className={styles.footer + " text-end mt-2"}>
            {content.linkLbl1}
            <Link href={content.link}>
              <a className={styles.link}>{content.linkLbl2}</a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          " w-100 w-md-50 d-flex flex-column justify-content-center align-items-center p-4"
        }
      >
        <img src="/auth-icon.svg" alt="auth icon" />
      </div>
    </div>
  );
};

export default Auth;
