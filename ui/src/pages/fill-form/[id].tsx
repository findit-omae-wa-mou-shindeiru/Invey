import { useRouter } from "next/router";
import {
  FillShortAnswer,
  FillParagraph,
  FillMultipleChoice,
  FillCheckbox,
  FillDropdown,
  FillLinearScale,
} from "components";
import {
  IQuestionType,
  IShortAnswer,
  IMultipleChoice,
  ICheckbox,
  IDropdown,
  ILinearScale,
} from "interfaces";
import { QuestionType } from "enums";
import { useState, useEffect } from "react";
import styles from "styles/fill-form/id.module.css";

const randomizer = () => {
  const id =
    Math.floor(
      Math.random() * Math.pow(10, Math.floor(Math.random() * 20)) + 1
    ) + "";

  return Array(id.length)
    .fill(0)
    .map((_, idx) => {
      return parseInt(id.charAt(idx)) % Object.keys(QuestionType).length;
    });
};

const FillFormDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchData = () => {
    const data = randomizer().map((e, idx) => {
      const datum = formGenerator(
        Object.keys(QuestionType)[e] as keyof typeof QuestionType
      );
      return datum;
    });

    setQuestions(data);
  };

  const [questions, setQuestions] = useState<IQuestionType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeAnswer = (
    idx: number,
    answer: string | { label: string; checked: boolean }[] | number | undefined
  ) => {
    if (!questions) {
      return;
    }

    if (questions[idx].type === QuestionType.Checkbox) {
      const newQuestions = [...questions];
      newQuestions[idx].options = answer;
      setQuestions(newQuestions);
      return;
    }

    const newQuestions = [...questions];
    newQuestions[idx].answer = answer;
    setQuestions(newQuestions);
  };

  return (
    <div className="page">
      <h1>Fill Form Detail</h1>
      <h2>ID: {id}</h2>
      <div>
        {questions &&
          questions.map((question, idx) => {
            return questionBuilder({
              question,
              onChangeAnswer,
              idx,
            });
          })}
      </div>
      <div>
        <button onClick={() => console.log(questions)}>submit</button>
      </div>
    </div>
  );
};

const formGenerator = (type: keyof typeof QuestionType): IQuestionType => {
  switch (QuestionType[type]) {
    case QuestionType.ShortAnswer:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: false,
      } as IShortAnswer;
    case QuestionType.Paragraph:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: false,
      } as IShortAnswer;
    case QuestionType.MultipleChoice:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: false,
        options: ["option 1", "option 2", "option 3"],
      } as IMultipleChoice;
    case QuestionType.Checkbox:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: [],
        isRequired: false,
        options: [
          {
            label: "option 1",
            checked: false,
          },
          {
            label: "option 2",
            checked: false,
          },
          {
            label: "option 3",
            checked: false,
          },
        ],
      } as ICheckbox;
    case QuestionType.Dropdown:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: false,
        options: ["option 1", "option 2", "option 3"],
      } as IDropdown;
    case QuestionType.LinearScale:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: undefined,
        isRequired: false,
        minScale: 1,
        maxScale: 5,
        minLabel: "Minimum Label",
        maxLabel: "Maximum Label",
      } as ILinearScale;
  }
};

const questionBuilder = ({
  question,
  onChangeAnswer,
  idx,
}: {
  question: IQuestionType;
  onChangeAnswer: (
    idx: number,
    answer: string | { label: string; checked: boolean }[] | number | undefined
  ) => void;
  idx: number;
}): JSX.Element | undefined => {
  switch (QuestionType[question.type as keyof typeof QuestionType]) {
    case QuestionType.ShortAnswer:
      return (
        <FillShortAnswer
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
    case QuestionType.Paragraph:
      return (
        <FillParagraph
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
    case QuestionType.MultipleChoice:
      return (
        <FillMultipleChoice
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
    case QuestionType.Checkbox:
      return (
        <FillCheckbox
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
    case QuestionType.Dropdown:
      return (
        <FillDropdown
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
    case QuestionType.LinearScale:
      return (
        <FillLinearScale
          key={idx}
          question={question}
          onChangeAnswer={onChangeAnswer}
          index={idx}
          className={styles.question}
        />
      );
  }
};

export default FillFormDetail;
