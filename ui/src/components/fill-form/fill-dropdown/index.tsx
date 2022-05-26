import styles from "./index.module.css";
import { IDropdown } from "interfaces";
import Dropdown from "react-bootstrap/Dropdown";

const FillDropdown = ({
  question,
  index,
  onChangeAnswer,
  className,
}: {
  question: IDropdown;
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
      <div className={styles.dropdownContainer}>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className={styles.dropdownToggle}
          >
            {question.answer ? question.answer : "No answer yet"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {question.options.map((option, idx) => {
              return (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    onChangeAnswer(index, option);
                  }}
                >
                  {option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FillDropdown;
