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

const defaultAnswer = (type: keyof typeof QuestionType) => {
  switch (QuestionType[type]) {
    case QuestionType.ShortAnswer:
    case QuestionType.Paragraph:
    case QuestionType.Dropdown:
    case QuestionType.MultipleChoice:
      return "";
    case QuestionType.Checkbox:
      return [];
    case QuestionType.LinearScale:
      return undefined;
  }
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

  const onClearAnswer = (idx: number) => {
    if (!questions) {
      return;
    }

    if (questions[idx].type === QuestionType.Checkbox) {
      const newQuestions = [...questions];
      newQuestions[idx].options = newQuestions[idx].options.map(
        (e: { label: string; checked: boolean }) => {
          return {
            label: e.label,
            checked: false,
          };
        }
      );
      setQuestions(newQuestions);
      return;
    }

    const newQuestions = [...questions];
    newQuestions[idx].answer = defaultAnswer(questions[idx].type);
    setQuestions(newQuestions);
  };

  const onSubmit = () => {
    console.log(questions);
    if (
      questions.some((question) => {
        return (
          question.isRequired &&
          (!question.answer || question.answer !== 0) &&
          question.answer.length === 0
        );
      })
    ) {
      alert("Please fill all required fields");
    }
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
              onClearAnswer,
            });
          })}
      </div>
      <div>
        <button onClick={onSubmit}>submit</button>
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
        isRequired: true,
      } as IShortAnswer;
    case QuestionType.Paragraph:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: true,
      } as IShortAnswer;
    case QuestionType.MultipleChoice:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: "",
        isRequired: true,
        options: ["option 1", "option 2", "option 3"],
      } as IMultipleChoice;
    case QuestionType.Checkbox:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: [],
        isRequired: true,
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
        isRequired: true,
        options: ["option 1", "option 2", "option 3"],
      } as IDropdown;
    case QuestionType.LinearScale:
      return {
        type,
        title: "Ini title",
        description: "Ini description",
        answer: undefined,
        isRequired: true,
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
  onClearAnswer,
}: {
  question: IQuestionType;
  onChangeAnswer: (
    idx: number,
    answer: string | { label: string; checked: boolean }[] | number | undefined
  ) => void;
  idx: number;
  onClearAnswer: (idx: number) => void;
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
          onClearAnswer={onClearAnswer}
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
          onClearAnswer={onClearAnswer}
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
          onClearAnswer={onClearAnswer}
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
          onClearAnswer={onClearAnswer}
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
          onClearAnswer={onClearAnswer}
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
          onClearAnswer={onClearAnswer}
        />
      );
  }
};

export default FillFormDetail;
