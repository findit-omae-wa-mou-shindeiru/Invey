interface ICheckbox {
  type: 'Checkbox';
  title: string;
  description: string;
  options: { label: string; checked: boolean }[];
  isRequired: boolean;
  answer: string[];
}

export default ICheckbox;
