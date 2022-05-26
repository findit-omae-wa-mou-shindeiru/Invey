import styles from './index.module.css';
import { QuestionType } from 'enums';

const getImgPath = (type: string) => {
  switch (type) {
    case 'ShortAnswer':
      return '/short-answer-question-icon.svg';
    case 'Paragraph':
      return '/paragraph-question-icon.svg';
    case 'MultipleChoice':
      return '/multiple-choice-question-icon.svg';
    case 'Checkbox':
      return '/checkbox-question-icon.svg';
    case 'LinearScale':
      return '/star-rating-question-icon.svg';
    case 'Dropdown':
      return '/dropdown-question-icon.svg';
  }
};

const AddQuestionSidebar = ({
  onAddQuestion,
}: {
  onAddQuestion: (
    type: keyof typeof QuestionType,
  ) => void;
}) => {
  return (
    <div className={styles.container}>
      {(
        Object.keys(QuestionType) as Array<
          keyof typeof QuestionType
        >
      ).map((type) => {
        return (
          <div
            key={type}
            className={styles.boxContainer}
            onClick={() => onAddQuestion(type)}
          >
            <div
              className={
                styles.boxContent +
                ' d-flex align-items-center'
              }
            >
              <div
                className={styles.iconContainer}
              >
                <img
                  src={getImgPath(type)}
                  alt={type + ' icon'}
                />
              </div>
              <div className={styles.typeLabel}>
                {QuestionType[type]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddQuestionSidebar;
