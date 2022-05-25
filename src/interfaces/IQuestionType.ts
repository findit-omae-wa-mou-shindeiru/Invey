import {
  IShortAnswer,
  IParagraph,
  ICheckbox,
  IDropdown,
  IMultipleChoice,
  IStarRating,
} from 'interfaces';

type IQuestionType =
  | IShortAnswer
  | IParagraph
  | ICheckbox
  | IDropdown
  | IMultipleChoice
  | IStarRating;

export default IQuestionType;
