import { Auth } from 'layout';

const Login = () => {
  const content = {
    title: 'Welcome Back',
    subtitle: 'Hello, there',
    inputs: [
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
    btn: 'Login',
    linkLbl1: "Don't have an account? ",
    linkLbl2: 'Register here',
    link: '/register',
    onSubmit: (params: Object) =>
      console.log('login', params),
  };

  return <Auth content={content} />;
};

export default Login;
