interface IMultipleChoice {
  type: 'MultipleChoice';
  title: string;
  description: string;
  options: string[];
  answer: string;
  isRequired: boolean;
}

export default IMultipleChoice;