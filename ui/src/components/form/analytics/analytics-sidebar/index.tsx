import styles from "./index.module.css";

const AnalyticsSidebar = ({
  options,
  onChangeOption,
}: {
  options: { label: string; code: string }[];
  onChangeOption: (code: string) => void;
}) => {
  return (
    <div className={styles.container}>
      {options.map((option, idx) => {
        return (
          <div
            key={idx}
            onClick={() => onChangeOption(option.code)}
            className={styles.boxContainer}
          >
            <div
              className={
                styles.typeLabel +
                " d-flex align-items-center justify-content-center"
              }
            >
              {option.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsSidebar;
