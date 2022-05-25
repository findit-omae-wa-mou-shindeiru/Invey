interface IShortAnswer {
  type: 'ShortAnswer';
  title: string;
  description: string;
  answer: string;
  isRequired: boolean;
}

export default IShortAnswer;