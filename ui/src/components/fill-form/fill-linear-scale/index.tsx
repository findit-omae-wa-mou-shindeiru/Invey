import styles from "./index.module.css";
import { ILinearScale } from "interfaces";

const FillLinearScale = ({
  question,
  index,
  onChangeAnswer,
  className,
}: {
  question: ILinearScale;
  index: number;
  onChangeAnswer: (index: number, answer: number) => void;
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
        <div className={" d-flex justify-content-between"}>
          {Array(question.maxScale - question.minScale + 1)
            .fill(0)
            .map((_, idx) => {
              const scale = question.minScale + idx;
              return (
                <div key={idx} className={styles.answerContainer}>
                  <div
                    className={
                      styles.answerInputContainer + " d-flex align-items-center"
                    }
                  >
                    <input
                      type="radio"
                      className={styles.inputDisabled}
                      onClick={() => {
                        onChangeAnswer(index, scale);
                      }}
                      readOnly
                      checked={question.answer === scale}
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
          <div className={styles.maxLabel}>{question.maxLabel}</div>
          <div className={styles.minLabel}>{question.minLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default FillLinearScale;
