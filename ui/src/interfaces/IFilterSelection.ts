interface IFilterSelection {
  label: string;
  type: string;
  options: {
    label: string;
    id: number;
  }[];
  checked: number[]
}

export default IFilterSelection;
