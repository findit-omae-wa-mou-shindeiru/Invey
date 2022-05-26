import styles from "./index.module.css";
import { IShortAnswer } from "interfaces";
import { useState } from "react";

const ShortAnswerQuestion = ({
  index,
  questionState,
  onChange,
  onDelete,
  className,
}: {
  index: number;
  questionState: IShortAnswer;
  onChange: (index: number, state: IShortAnswer) => void;
  onDelete: (index: number) => void;
  className?: string;
}) => {
  const [editing, setEditing] = useState<boolean>(true);

  return (
    <div
      className={
        className +
        " " +
        styles.container +
        " " +
        (editing ? "" : styles.disabled)
      }
    >
      <div className={styles.titleContainer + " d-flex align-items-center"}>
        <div className={styles.idxContainer}>{index + 1 + ". "}</div>
        <div className={styles.titleInputContainer}>
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
      <div className={styles.answerContainer}>
        <input
          type="text"
          className={styles.inputDisabled}
          disabled={true}
          placeholder="Input answer here"
        />
      </div>
      <div className={styles.btnContainer + " d-flex justify-content-between"}>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className={styles.btnEdit + " btn me-3"}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Done" : "Edit"}
          </button>
          {editing && (
            <div className={styles.requiredCheckbox + " d-flex"}>
              <input
                type="checkbox"
                checked={questionState.isRequired}
                onChange={() => {
                  onChange(index, {
                    ...questionState,
                    isRequired: !questionState.isRequired,
                  });
                }}
              />
              <div>Required</div>
            </div>
          )}
        </div>

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

export default ShortAnswerQuestion;
