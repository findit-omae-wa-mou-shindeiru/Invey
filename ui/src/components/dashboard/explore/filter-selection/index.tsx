import styles from "./index.module.css";
import Accordion from "react-bootstrap/Accordion";
import { IFilterOptions } from "interfaces";
import { useState } from "react";
import NumericInput from "react-numeric-input";

const FilterSelection = ({
  filters,
  onApply,
}: {
  filters: IFilterOptions;
  onApply: (filters: IFilterOptions) => void;
}) => {
  const [states, setStates] = useState(filters);

  const handleFilter = () => {
    console.log(states);
    // setStates(initialState);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className={styles.leftContainer + " ms-4 d-none d-lg-block"}>
        <div className={styles.topLeftContainer + " mb-4"}>
          <button
            className={styles.filterBtn + " d-flex align-items-center"}
            onClick={() => onApply(states)}
          >
            <div className={styles.filterIconContainer + " me-2"}>
              <img src="/filter-icon.svg" alt="filter icon" />
            </div>
            <div>Apply Filter</div>
          </button>
        </div>
        <div className={styles.filterOptionsContainer}>
          <Accordion
            flush
            defaultActiveKey={states.checkbox.map((_, idx) => "" + idx)}
            alwaysOpen
          >
            {states.checkbox.map((filter, idx) => {
              return (
                <Accordion.Item
                  eventKey={"" + idx}
                  key={filter.label}
                  className={"mb-4"}
                >
                  <Accordion.Header className="mb-3">
                    {capitalizeFirstLetter(filter.label)}
                  </Accordion.Header>
                  <Accordion.Body>
                    {filter.options.map((option, j) => {
                      return (
                        <div
                          key={option.label}
                          className={" d-flex align-items-center mb-2"}
                        >
                          <div
                            className={
                              styles.inputContainer +
                              " d-flex align-items-center"
                            }
                          >
                            <input
                              type="checkbox"
                              // check whether option.id is in checked
                              checked={filter.checked.includes(option.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const newChecked = checked
                                  ? [...filter.checked, option.id]
                                  : filter.checked.filter(
                                      (id) => id !== option.id
                                    );
                                setStates((prev) => {
                                  return {
                                    ...prev,
                                    checkbox: [
                                      ...prev.checkbox.slice(0, idx),
                                      {
                                        ...prev.checkbox[idx],
                                        checked: newChecked,
                                      },
                                      ...prev.checkbox.slice(idx + 1),
                                    ],
                                  };
                                });
                              }}
                            />
                          </div>
                          <div className={styles.inputLabel + " ms-2"}>
                            {option.label}
                          </div>
                        </div>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
            {filters.inputNumber.map((filter, idx) => {
              return (
                <Accordion.Item
                  eventKey={"" + idx}
                  key={filter.label}
                  className={"mb-4"}
                >
                  <Accordion.Header className="mb-3">
                    {capitalizeFirstLetter(filter.label)}
                  </Accordion.Header>
                  <Accordion.Body>
                    <NumericInput
                      mobile
                      className={styles.inputNumber + " form-control"}
                      value={states.inputNumber[idx].value}
                      onChange={(value: number) => {
                        setStates((prev) => {
                          return {
                            ...prev,
                            inputNumber: [
                              ...prev.inputNumber.slice(0, idx),
                              {
                                ...prev.inputNumber[idx],
                                value,
                              },
                              ...prev.inputNumber.slice(idx + 1),
                            ],
                          };
                        });
                      }}
                      min={1}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
      <style>
        {`
        .accordion-item {
          border: none;
        }
        .accordion-button:not(.collapsed) {
          background-color: #fff;
          box-shadow: none;
        }
        .accordion-button {
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 23px;
          color: #808082 !important;
          padding: 0;
        }
        .accordion-body {
          padding: 0;
        }
        `}
      </style>
    </>
  );
};

export default FilterSelection;
