import styles from './index.module.css';
import { IDropdown } from 'interfaces';
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';

const DropdownQuestion = ({
  index,
  questionState,
  onChange,
  onDelete,
  className,
}: {
  index: number;
  questionState: IDropdown;
  onChange: (
    index: number,
    state: IDropdown,
  ) => void;
  onDelete: (index: number) => void;
  className?: string;
}) => {
  const [editing, setEditing] =
    useState<boolean>(true);

  return (
    <div
      className={
        className +
        ' ' +
        styles.container +
        ' ' +
        (editing ? '' : styles.disabled)
      }
    >
      <div
        className={
          styles.titleContainer +
          ' d-flex align-items-center'
        }
      >
        <div className={styles.idxContainer}>
          {index + 1 + '. '}
        </div>
        <div
          className={styles.titleInputContainer}
        >
          <input
            type="text"
            value={questionState.title}
            disabled={!editing}
            onChange={(e) =>
              onChange(index, {
                ...questionState,
                title: e.target.value,
              })
            }
            placeholder="title"
          />
        </div>
      </div>
      {(editing || questionState.description) && (
        <div className={styles.descContainer}>
          <input
            type="text"
            value={questionState.description}
            disabled={!editing}
            onChange={(e) =>
              onChange(index, {
                ...questionState,
                description: e.target.value,
              })
            }
            placeholder="description"
          />
        </div>
      )}
      {editing ? (
        <div className={styles.answersContainer}>
          {questionState.options.map(
            (option, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    styles.answerContainer +
                    ' d-flex align-items-center w-100'
                  }
                >
                  <div
                    className={
                      styles.answerInputContainer +
                      ' d-flex align-items-center'
                    }
                  >
                    <input
                      type="text"
                      value={option}
                      disabled={!editing}
                      onChange={(e) => {
                        onChange(index, {
                          ...questionState,
                          options: [
                            ...questionState.options.slice(
                              0,
                              idx,
                            ),
                            e.target.value,
                            ...questionState.options.slice(
                              idx + 1,
                            ),
                          ],
                        });
                      }}
                    />
                  </div>
                  <div
                    className={
                      styles.closeButtonContainer +
                      ' ms-3 ' +
                      (editing ? '' : 'd-none')
                    }
                  >
                    <CloseButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const newOptions =
                          questionState.options
                            .slice(0, idx)
                            .concat(
                              questionState.options.slice(
                                idx + 1,
                              ),
                            );

                        onChange(index, {
                          ...questionState,
                          options: newOptions,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      ) : (
        <div className={styles.dropdownContainer}>
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              disabled={true}
              className={styles.dropdownToggle}
            >
              {questionState.options[0]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {questionState.options.map(
                (option, idx) => {
                  return (
                    <Dropdown.Item key={idx}>
                      {option}
                    </Dropdown.Item>
                  );
                },
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      {editing && (
        <div
          className={
            styles.addNewOptionBtnContainer +
            ' d-flex justify-content-end'
          }
        >
          <button
            type="button"
            className="btn btn-primary mb-4"
            onClick={(e) => {
              e.stopPropagation();
              onChange(index, {
                ...questionState,
                options: [
                  ...questionState.options,
                  'new option',
                ],
              });
            }}
          >
            Add New Option
          </button>
        </div>
      )}
      <div
        className={
          styles.btnContainer +
          ' d-flex justify-content-between'
        }
      >
        <button
          type="button"
          className={styles.btnEdit + ' btn'}
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Done' : 'Edit'}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DropdownQuestion;
