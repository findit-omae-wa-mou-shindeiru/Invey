interface IContent {
  title: string;
  subtitle: string;
  inputs: {
    key: string;
    placeholder: string;
    defaultValue: string;
    type: string;
  }[];
  btn: string;
  linkLbl1: string;
  linkLbl2: string;
  link: string;
  onSubmit: (params: Object) => void;
}

export default IContent;
