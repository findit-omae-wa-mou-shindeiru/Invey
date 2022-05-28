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
import { ApiProxy } from "services";

interface IQuestionOverview {
  title: string;
  description?: string;
  banner: string;
}

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
  const [loading, setLoading] = useState(false);

  const dummyfetchData = () => {
    const data = {
      title: "Some title for questions",
      description:
        "Some description for questions, here is a long description and it is very long and very long, but not that very very long. Please just ignore this because it is just for testing",
      questions: randomizer().map((e, idx) => {
        const datum = formGenerator(
          Object.keys(QuestionType)[e] as keyof typeof QuestionType
        );
        return datum;
      }),
      banner: "/banner-question.png",
    };

    setOverview({
      title: data.title,
      description: data.description,
      banner: data.banner,
    });
    setQuestions(data.questions);
  };

  const fetchData = async () => {
    const { id } = router.query;
    const { res, err } = await ApiProxy.getInstance().get(
      "survey-question/" + id
    );

    if (err || !res) {
      alert(err);
      return;
    }

    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    // console.log("fetch data", data);
    setOverview(data);
  };

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchData()]);
    setLoading(false);
  };

  const [overview, setOverview] = useState<IQuestionOverview>();
  const [questions, setQuestions] = useState<IQuestionType[]>([]);

  useEffect(() => {
    if (router.query?.id) {
      fetchAll();
    }
  }, [router]);

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
    <div className={styles.pageContainer}>
      <div className={styles.container + " page"}>
        <div className={styles.topContainer}>
          <div className={styles.bannerContainer}>
            <img src="/banner-question.png" alt="banner" />
          </div>
          {overview && (
            <div className={styles.textOverviewContainer + " mt-3"}>
              <div className={styles.title}>{overview.title}</div>
              {overview.description && (
                <div className={styles.desc + " mt-2"}>
                  {overview.description}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.contentContainer + " mt-3"}>
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
        <div
          className={
            styles.btnContainer + " mt-5 btn d-flex justify-content-end"
          }
        >
          <button onClick={onSubmit}>Submit</button>
        </div>
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
