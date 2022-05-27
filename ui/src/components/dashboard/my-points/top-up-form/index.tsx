import styles from "./index.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import NumericInput from "react-numeric-input";

interface IPaymentMethod {
  label: string;
  accNumber: string;
}

const paymentMethodOptions = [
  {
    label: "Bank BRI",
    accNumber: "0081 326 088 088",
  },
  {
    label: "Bank BCA",
    accNumber: "0814 0458 12",
  },
  {
    label: "GoPay",
    accNumber: "9214 0118 4180",
  },
  {
    label: "PayPal",
    accNumber: "73274 1298 1432",
  },
];

const TopUpForm = ({ onVerify }: { onVerify: (point: number) => void }) => {
  const [point, setPoint] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod | null>(
    null
  );

  const convertPointToRp = (point: number) => {
    const rp = point * 7000;

    // parse to rupiah per thousand
    return `Rp ${rp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},00`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Top Up Points</div>
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
      </div>
      <div className={styles.paymentMethodContainer}>
        <div className={styles.formLabel}>Payment Method</div>
        <div className={styles.paymentMethodInputContainer}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {paymentMethod ? paymentMethod.label : "Select Payment Method"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {paymentMethodOptions.map((option, idx) => {
                return (
                  <Dropdown.Item
                    key={idx}
                    onClick={() => {
                      setPaymentMethod(option);
                    }}
                  >
                    {option.label}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {paymentMethod && point && (
        <div className={styles.transferInfoContainer}>
          <div className={styles.transferInfoNumber}>
            Transfer to {paymentMethod.accNumber}
          </div>
          <div className={styles.transferPoint}>
            for {convertPointToRp(point!)}
          </div>
          <div className={styles.transferInfoStep}>
            Then click the check button below
          </div>
        </div>
      )}
      <div className={styles.btnContainer}>
        <button
          className={styles.btnVerify + " btn"}
          disabled={!paymentMethod || !point}
          onClick={() => {
            if (!point) {
              return;
            }

            onVerify(point);
          }}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default TopUpForm;
