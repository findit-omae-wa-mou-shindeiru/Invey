import styles from "./index.module.css";
import { ILinearScale } from "interfaces";
import { useState } from "react";
// import CloseButton from "react-bootstrap/CloseButton";

const LinearScaleQuestion = ({
  index,
  questionState,
  onChange,
  onDelete,
  className,
}: {
  index: number;
  questionState: ILinearScale;
  onChange: (index: number, state: ILinearScale) => void;
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
      {editing ? (
        <div className={styles.editQuestionContainer + " mb-4"}>
          <div className={styles.editScaleContainer + " mb-3"}>
            <div className={styles.editMinScale + " mb-3"}>
              <input
                type="number"
                pattern="[0-9]*"
                value={questionState.minScale}
                disabled={!editing}
                onChange={(e) => {
                  onChange(index, {
                    ...questionState,
                    minScale: parseInt(e.target.value),
                  });
                }}
                max={questionState.maxScale - 1}
              />
            </div>
            <div className={styles.editMaxScale}>
              <input
                type="number"
                pattern="[0-9]*"
                value={questionState.maxScale}
                disabled={!editing}
                onChange={(e) => {
                  onChange(index, {
                    ...questionState,
                    maxScale: parseInt(e.target.value),
                  });
                }}
                min={questionState.minScale + 1}
              />
            </div>
          </div>
          <div className={styles.editLabelContainer + " mb-3"}>
            <div className={styles.editMinScale + " mb-3"}>
              <input
                type="text"
                value={questionState.minLabel}
                disabled={!editing}
                onChange={(e) =>
                  onChange(index, {
                    ...questionState,
                    minLabel: e.target.value,
                  })
                }
                placeholder="max label"
              />
            </div>
            <div className={styles.editMaxLabel}>
              <input
                type="text"
                value={questionState.maxLabel}
                disabled={!editing}
                onChange={(e) =>
                  onChange(index, {
                    ...questionState,
                    maxLabel: e.target.value,
                  })
                }
                placeholder="min label"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.answersContainer}>
          <div className={" d-flex justify-content-between"}>
            {Array(questionState.maxScale - questionState.minScale + 1)
              .fill(0)
              .map((_, idx) => {
                const scale = questionState.minScale + idx;
                return (
                  <div key={idx} className={styles.answerContainer}>
                    <div
                      className={
                        styles.answerInputContainer +
                        " d-flex align-items-center"
                      }
                    >
                      <input
                        type="radio"
                        className={styles.inputDisabled}
                        disabled={true}
                        value={scale}
                        name={scale + ""}
                      />
                    </div>
                    <div className="text-center">{scale}</div>
                  </div>
                );
              })}
          </div>
          <div
            className={
              styles.labelContainer + " d-flex justify-content-between mt-2"
            }
          >
            <div className={styles.maxLabel}>{questionState.maxLabel}</div>
            <div className={styles.minLabel}>{questionState.minLabel}</div>
          </div>
        </div>
      )}
      <div className={styles.btnContainer + " d-flex justify-content-between"}>
        <button
          type="button"
          className={styles.btnEdit + " btn"}
          onClick={() => {
            if (questionState.minScale >= questionState.maxScale) {
              alert("min scale must be less than max scale");
              return;
            }

            setEditing(!editing)
          }}
        >
          {editing ? "Done" : "Edit"}
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

export default LinearScaleQuestion;
