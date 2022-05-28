import { IFilterSelection } from "interfaces";

interface IFilterOptions {
  checkbox: IFilterSelection[];
  inputNumber: {
    label: string;
    value: number | null;
    key: string;
  }[];
}

export default IFilterOptions;
