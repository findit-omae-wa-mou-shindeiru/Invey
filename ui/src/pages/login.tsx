import { useRouter } from "next/router";
import { Auth } from "layout";
import { ApiProxy } from "services";

const Login = () => {
  const router = useRouter();

  const content = {
    title: "Welcome Back",
    subtitle: "Hello, there",
    inputs: [
      {
        key: "email",
        placeholder: "Email",
        defaultValue: "",
        type: "email",
      },
      {
        key: "password",
        placeholder: "Password",
        defaultValue: "",
        type: "password",
      },
    ],
    btn: "Login",
    linkLbl1: "Don't have an account? ",
    linkLbl2: "Register here",
    link: "/register",
  };

  const onSubmit = async (params: Object) => {
    const { err } = await ApiProxy.getInstance().login(
      params as {
        email: string;
        password: string;
      }
    );

    if (err) {
      alert(err);
    } else {
      router.push("/dashboard/explore");
    }
  };

  return <Auth content={content} submitCallback={onSubmit} />;
};

export default Login;
