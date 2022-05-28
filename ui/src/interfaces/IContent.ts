interface IContent {
  title: string;
  subtitle: string;
  inputs: {
    key: string;
    placeholder: string;
    defaultValue: string;
    type: string;
    options?: { label: string; id: string }[];
  }[];
  btn: string;
  linkLbl1: string;
  linkLbl2: string;
  link: string;
}

export default IContent;
