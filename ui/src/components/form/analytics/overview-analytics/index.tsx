import styles from "./index.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Visualisasi Data Survey",
    },
  },
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels: MONTHS,
  datasets: [
    {
      label: "Dataset 1",
      data: Array(12)
        .fill(0)
        .map(() => Math.random() * 100),
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.25,
    },
    {
      label: "Dataset 2",
      data: Array(12)
        .fill(0)
        .map(() => Math.random() * 100),
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const OverviewAnalytics = () => {
  return (
    <div className={styles.container + " w-100"}>
      <div className={styles.title + " mb-3"}>
        <h1>Overview Analytics</h1>
      </div>
      <div className={styles.content}>
        <Line data={data} options={options} className={styles.graph} />
      </div>
    </div>
  );
};

export default OverviewAnalytics;
