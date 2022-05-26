interface ISurveySummary {
  title: string;
  description: string;
  rewardPoint: number;
  target: {
    label: string;
    value: string;
  }[];
}

export default ISurveySummary;
