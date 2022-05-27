import styles from "./index.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import NumericInput from "react-numeric-input";

const transferMethodOptions = ["Bank BRI", "Bank BCA", "GoPay", "PayPal"];

const RedeemForm = ({
  onTransfer,
}: {
  onTransfer: (nominal: number) => void;
}) => {
  const [point, setPoint] = useState<number | null>();
  const [transferMethod, setTransferMethod] = useState<string | null>(null);
  const [accNumber, setAccNumber] = useState<string>();

  const convertPointToRp = (point: number) => {
    const rp = point * 1000;

    // parse to rupiah per thousand
    return `Rp ${rp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Redeem Points</div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.pointContainer}>
          <div className={styles.formLabel}>Point</div>
          <div className={styles.pointInputContainer}>
            <NumericInput
              mobile
              className={styles.pointInput + " form-control"}
              value={point}
              onChange={(value: number) => {
                setPoint(value);
              }}
              min={1}
            />
          </div>
        </div>
        <div className={styles.transferMethodContainer}>
          <div className={styles.formLabel}>Transfer Method</div>
          <div className={styles.transferMethodInputContainer}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {transferMethod ? transferMethod : "Select Transfer Method"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {transferMethodOptions.map((option, idx) => {
                  return (
                    <Dropdown.Item
                      key={idx}
                      onClick={() => {
                        setTransferMethod(option);
                      }}
                    >
                      {option}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={styles.accNumberContainer}>
          <div className={styles.formLabel}>Account Number</div>
          <div className={styles.accNumberInputContainer}>
            <input
              className={styles.accNumberInput}
              placeholder="Enter Account Number"
              type="text"
              value={accNumber}
              onChange={(e) => {
                setAccNumber(e.target.value);
              }}
            />
          </div>
        </div>
        {transferMethod && point && accNumber && (
          <div className={styles.transferInfoContainer}>
            You will get {convertPointToRp(point)} to your {transferMethod}{" "}
            account.
          </div>
        )}
        <div
          className={styles.btnContainer + " mt-4 d-flex justify-content-end"}
        >
          <button
            className={styles.btnTransfer + " btn btn-primary"}
            disabled={!transferMethod || !point || !accNumber}
            onClick={() => {
              if (!point) {
                return;
              }

              onTransfer(point);
            }}
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemForm;
