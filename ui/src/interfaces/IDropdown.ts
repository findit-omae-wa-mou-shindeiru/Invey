interface IDropdown {
  type: 'Dropdown';
  title: string;
  description: string;
  options: string[];
  answer: string;
  isRequired: boolean;
}

export default IDropdown;