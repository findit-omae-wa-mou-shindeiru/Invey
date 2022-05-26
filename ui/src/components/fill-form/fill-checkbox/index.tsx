import { ICheckbox } from "interfaces";
import styles from "./index.module.css";

const FillCheckbox = ({
  question,
  index,
  onChangeAnswer,
  className,
}: {
  question: ICheckbox;
  index: number;
  onChangeAnswer: (
    index: number,
    answer: { label: string; checked: boolean }[]
  ) => void;
  className?: string;
}) => {
  return (
    <div className={className + " " + styles.container}>
      <div className={styles.titleContainer + " d-flex align-items-center"}>
        <div className={styles.idxContainer}>{index + 1 + ". "}</div>
        <div className={styles.titleInputContainer}>
          <div className={styles.title}>{question.title}</div>
        </div>
      </div>
      {question.description && (
        <div className={styles.descContainer}>
          <div className={styles.desc}>{question.description}</div>
        </div>
      )}
      <div className={styles.answersContainer}>
        {question.options.map((option, idx) => {
          return (
            <div
              key={idx}
              className={
                styles.answerContainer + " d-flex align-items-center w-100"
              }
            >
              <div
                className={
                  styles.answerInputContainer + " d-flex align-items-center"
                }
                onClick={() => {
                  const options = [...question.options];
                  options[idx].checked = !options[idx].checked;
                  onChangeAnswer(index, options);
                }}
              >
                <input
                  type="checkbox"
                  className={styles.inputDisabled}
                  checked={option.checked}
                  readOnly
                />
                <div className={styles.optionLabel}>{option.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FillCheckbox;
