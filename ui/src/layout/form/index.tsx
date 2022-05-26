import styles from './index.module.css';
import { FormNav } from 'components';

const Form = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <div
      className={
        styles.container +
        ' page d-flex flex-column'
      }
    >
      <FormNav />
      <div
        className={
          styles.childrenContainer +
          ' d-flex flex-column'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Form;
