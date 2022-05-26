import styles from "./index.module.css";
import { IParagraph } from "interfaces";

const FillParagraph = ({
  question,
  index,
  onChangeAnswer,
  className,
}: {
  question: IParagraph;
  index: number;
  onChangeAnswer: (index: number, answer: string) => void;
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
      <div className={styles.answerContainer}>
        <textarea
          className={styles.inputDisabled}
          placeholder="Input answer here"
          onChange={(e) => onChangeAnswer(index, e.target.value)}
        />
      </div>
    </div>
  );
};

export default FillParagraph;
