interface ISurveySummary {
  title: string;
  description: string;
  reward_point: number;
  gender_id: number;
  audience_id: number;
  max_answer:number;
  category_id: number;
  target: {
    label: string;
    value: string;
  }[];
}

export default ISurveySummary;
