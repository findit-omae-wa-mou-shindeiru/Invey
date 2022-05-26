interface ILinearScale {
  type: 'LinearScale';
  title: string;
  description: string;
  minScale: number;
  maxScale: number;
  minLabel: string;
  maxLabel: string;
  answer: number | undefined;
  isRequired: boolean;
}

export default ILinearScale;