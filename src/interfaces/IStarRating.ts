interface IStarRating {
  type: 'StarRating';
  title: string;
  description: string;
  scale: number;
  minLabel: string;
  maxLabel: string;
  answer: number | null;
  isRequired: boolean;
}

export default IStarRating;