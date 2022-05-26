interface ILinearScale {
  type: 'LinearScale';
  title: string;
  description: string;
  minScale: number;
  maxScale: number;
  minLabel: string;
  maxLabel: string;
  answer: number | null;
  isRequired: boolean;
}

export default ILinearScale;