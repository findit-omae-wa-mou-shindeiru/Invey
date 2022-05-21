import styles from './index.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { IFilterSelection } from 'interfaces';
import { useState } from 'react';

const FilterSelection = ({
  filters,
}: {
  filters: IFilterSelection[];
}) => {
  const initialState = filters.map((filter) => {
    return {
      [filter.label]: filter.options.map(
        (option) => {
          return {
            [option.label]: false,
          };
        },
      ),
    };
  });

  const [states, setStates] =
    useState(initialState);

  const handleFilter = () => {
    console.log(states);
    // setStates(initialState);
  };

  return (
    <>
      <div
        className={
          styles.leftContainer +
          ' ms-4 d-none d-lg-block'
        }
      >
        <div
          className={
            styles.topLeftContainer + ' mb-4'
          }
        >
          <button
            className={
              styles.filterBtn +
              ' d-flex align-items-center'
            }
            onClick={handleFilter}
          >
            <div
              className={
                styles.filterIconContainer +
                ' me-2'
              }
            >
              <img
                src="/filter-icon.svg"
                alt="filter icon"
              />
            </div>
            <div>Filter</div>
          </button>
        </div>

        <div
          className={
            styles.filterOptionsContainer
          }
        >
          <Accordion
            flush
            defaultActiveKey={filters.map(
              (_, idx) => '' + idx,
            )}
            alwaysOpen
          >
            {filters.map((filter, idx) => {
              return (
                <Accordion.Item
                  eventKey={'' + idx}
                  key={filter.label}
                  className={'mb-4'}
                >
                  <Accordion.Header className="mb-3">
                    {filter.label}
                  </Accordion.Header>
                  <Accordion.Body>
                    {filter.options.map(
                      (option, j) => {
                        return (
                          <div
                            key={option.label}
                            className={
                              ' d-flex align-items-center mb-2'
                            }
                          >
                            <div
                              className={
                                styles.inputContainer +
                                ' d-flex align-items-center'
                              }
                            >
                              <input
                                type="checkbox"
                                checked={
                                  states[idx][
                                    filter.label
                                  ][j][
                                    option.label
                                  ]
                                }
                                onChange={(e) => {
                                  const newState =
                                    states[idx];
                                  newState[
                                    filter.label
                                  ][j][
                                    option.label
                                  ] =
                                    e.target.checked;
                                  setStates([
                                    ...states.slice(
                                      0,
                                      idx,
                                    ),
                                    newState,
                                    ...states.slice(
                                      idx + 1,
                                    ),
                                  ]);
                                }}
                              />
                            </div>
                            <div
                              className={
                                styles.inputLabel +
                                ' ms-2'
                              }
                            >
                              {option.label}
                            </div>
                          </div>
                        );
                      },
                    )}
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
