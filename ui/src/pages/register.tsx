import { Auth } from 'layout';

const Register = () => {
  const content = {
    title: 'Get Started for free',
    subtitle: 'Hello, there',
    inputs: [
      {
        key: 'firstName',
        placeholder: 'First Name',
        defaultValue: '',
        type: 'text',
      },
      {
        key: 'lastName',
        placeholder: 'Last Name',
        defaultValue: '',
        type: 'text',
      },
      {
        key: 'email',
        placeholder: 'Email',
        defaultValue: '',
        type: 'email',
      },
      {
        key: 'password',
        placeholder: 'Password',
        defaultValue: '',
        type: 'password',
      },
    ],
    btn: 'Register',
    linkLbl1: 'Already have an account? ',
    linkLbl2: 'login here',
    link: '/login',
    onSubmit: (params: Object) => console.log("register", params),
  };

  return (
    <Auth content={content} />
  );
};

export default Register;
