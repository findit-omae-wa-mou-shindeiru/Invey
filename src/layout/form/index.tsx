import styles from './index.module.css';
import { FormNav } from 'components';

const Form = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <div className={styles.container + ' page'}>
      <FormNav />
      <div>{children}</div>
    </div>
  );
};

export default Form;
