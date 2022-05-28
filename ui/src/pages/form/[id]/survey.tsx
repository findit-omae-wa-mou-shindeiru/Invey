import styles from "styles/form/survey.module.css";
import { Form } from "layout";
import { QuestionType } from "enums";
import {
  AddQuestionSidebar,
  ShortAnswerQuestion,
  ParagraphQuestion,
  MultipleChoiceQuestion,
  CheckboxQuestion,
  DropdownQuestion,
  LinearScaleQuestion,
} from "components";
import { useState } from "react";
import {
  IShortAnswer,
  IParagraph,
  ICheckbox,
  IDropdown,
  IMultipleChoice,
  ILinearScale,
  IQuestionType,
} from "interfaces";
import { useRouter } from "next/router";
import { ApiProxy } from "services";

const Survey = () => {
  const router = useRouter()
  const [questionStates, setQuestionStates] = useState<IQuestionType[]>([]);

  const onAddQuestion = (type: keyof typeof QuestionType) => {
    const questionState = formDefaultState(type);
    if (questionState) setQuestionStates([...questionStates, questionState]);
  };

  const onChange = (index: number, state: IQuestionType) => {
    const questionStatesCopy = [...questionStates];
    questionStatesCopy[index] = state;
    setQuestionStates(questionStatesCopy);
  };

  const onDelete = (index: number) => {
    const questionStatesCopy = [...questionStates];
    questionStatesCopy.splice(index, 1);
    setQuestionStates(questionStatesCopy);
  };

  const onSubmit = async () => {
    const {id} = router.query

    const { res, err } = await ApiProxy.getInstance().put(
      `survey-question/${id}`,
      questionStates
    )!;

    if (err || !res) {
      if(err.response.data) {
        alert(err.response.data)
      } else {
        alert(err);
      }
      return
    }

    alert("Successfully added question")
  };

  return (
    <Form>
      <div className={styles.container + " d-flex"}>
        <AddQuestionSidebar onAddQuestion={onAddQuestion} />
        <div className={styles.surveyContainer}>
          <div
            className={
              styles.questionContainer +
              " w-100 d-flex flex-column align-items-center"
            }
          >
            {questionStates.map((questionState, index) => {
              return formBuilder(
                questionState,
                index,
                onChange,
                onDelete,
                styles.question
              );
            })}
          </div>
          {questionStates && questionStates.length > 0 && (
            <div
              className={
                styles.btnContainer + " mt-5 d-flex justify-content-end"
              }
            >
              <button onClick={onSubmit} className="btn">
                Save Question
              </button>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

const formBuilder = (
  questionState: IQuestionType,
  index: number,
  onChange: (index: number, state: IQuestionType) => void,
  onDelete: (index: number) => void,
  className: string
) => {
  switch (QuestionType[questionState.type as keyof typeof QuestionType]) {
    case QuestionType.ShortAnswer:
      return (
        <ShortAnswerQuestion
          key={index}
          index={index}
          questionState={questionState as IShortAnswer}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
    case QuestionType.Paragraph:
      return (
        <ParagraphQuestion
          key={index}
          index={index}
          questionState={questionState as IParagraph}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <MultipleChoiceQuestion
          key={index}
          index={index}
          questionState={questionState as IMultipleChoice}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
    case QuestionType.Checkbox:
      return (
        <CheckboxQuestion
          key={index}
          index={index}
          questionState={questionState as ICheckbox}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
    case QuestionType.LinearScale:
      return (
        <LinearScaleQuestion
          key={index}
          index={index}
          questionState={questionState as ILinearScale}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
    case QuestionType.Dropdown:
      return (
        <DropdownQuestion
          key={index}
          index={index}
          questionState={questionState as IDropdown}
          onChange={onChange}
          onDelete={onDelete}
          className={className}
        />
      );
  }
};

const formDefaultState = (
  type: keyof typeof QuestionType
): IQuestionType | undefined => {
  switch (QuestionType[type]) {
    case QuestionType.ShortAnswer:
      return {
        type,
        title: "Short Answer Question",
        description: "description",
        answer: "",
        isRequired: false,
      } as IShortAnswer;
    case QuestionType.Paragraph:
      return {
        type,
        title: "Paragraph Question",
        description: "description",
        answer: "",
        isRequired: false,
      } as IParagraph;
    case QuestionType.MultipleChoice:
      return {
        type,
        title: "Multiple Choice Question",
        description: "description",
        options: ["option 1", "option 2"],
        answer: "",
        isRequired: false,
      } as IMultipleChoice;
    case QuestionType.Checkbox:
      return {
        type,
        title: "Checkbox Question",
        description: "description",
        options: [
          {
            label: "option 1",
            checked: false,
          },
          {
            label: "option 2",
            checked: false,
          },
        ],
        isRequired: false,
        answer: [],
      } as ICheckbox;
    case QuestionType.LinearScale:
      return {
        type,
        title: "Linear Scale Question",
        description: "description",
        minScale: 1,
        maxScale: 5,
        minLabel: "Minimum Label",
        maxLabel: "Maximum Label",
        answer: undefined,
        isRequired: false,
      } as ILinearScale;
    case QuestionType.Dropdown:
      return {
        type,
        title: "Dropdown Question",
        description: "description",
        options: ["option 1", "option 2"],
        answer: "",
        isRequired: false,
      } as IDropdown;
  }
};

export default Survey;
