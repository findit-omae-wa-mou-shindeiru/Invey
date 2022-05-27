import { useRouter } from "next/router";
import { Auth } from "layout";
import { ApiProxy } from "services";

const Register = () => {
  const router = useRouter();

  const content = {
    title: "Get Started for free",
    subtitle: "Hello, there",
    inputs: [
      {
        key: "firstname",
        placeholder: "First Name",
        defaultValue: "",
        type: "text",
      },
      {
        key: "secondname",
        placeholder: "Last Name",
        defaultValue: "",
        type: "text",
      },
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
    btn: "Register",
    linkLbl1: "Already have an account? ",
    linkLbl2: "login here",
    link: "/login",
    onSubmit: async (params: Object) => {
      const { err } = await ApiProxy.getInstance().register(
        params as {
          firstname: string;
          secondname: string;
          email: string;
          password: string;
        }
      );

      if (err) {
        alert(err);
      } else {
        router.push("/dashboard/explore");
      }
    },
  };

  return <Auth content={content} />;
};

export default Register;
