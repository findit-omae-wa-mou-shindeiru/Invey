import styles from "./index.module.css";
import { IMultipleChoice } from "interfaces";

const FillMultipleChoice = ({
  question,
  index,
  onChangeAnswer,
  className,
  onClearAnswer,
}: {
  question: IMultipleChoice;
  index: number;
  onChangeAnswer: (index: number, answer: string) => void;
  className?: string;
  onClearAnswer: (idx: number) => void;
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
                onClick={() => onChangeAnswer(index, option)}
              >
                <input
                  type="radio"
                  className={styles.inputDisabled}
                  value={option}
                  name={option}
                  checked={question.answer === option}
                  readOnly
                />
                <div className={styles.optionLabel}>{option}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 d-flex justify-content-end">
        <button
          className="btn btn-danger"
          onClick={() => {
            onClearAnswer(index);
          }}
        >
          Clear answer
        </button>
      </div>
    </div>
  );
};

export default FillMultipleChoice;
