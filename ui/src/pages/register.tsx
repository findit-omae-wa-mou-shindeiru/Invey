import { useRouter } from "next/router";
import { Auth } from "layout";
import { ApiProxy } from "services";
import { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();

  useEffect(() => {
    const getInitialData = async () => {
      const { res, err } = await ApiProxy.getInstance().getInitialData(
        "survey-filters"
      )!;

      if (err || !res) {
        alert(err);
        return;
      }

      if (res!.status == 200) {
        setContent({
          ...content,
          inputs: [...content.inputs],
        });
      } else {
        alert(res.data);
      }
    };
    getInitialData();
  }, []);

  const [content, setContent] = useState({
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
      {
        key: "position",
        placeholder: "Select Position",
        defaultValue: "",
        type: "dropdown",
        options: [
          {
            label: "Student",
            id: "STUDENT",
          },
          {
            label: "Teacher",
            id: "TEACHER",
          },
          {
            label: "Worker",
            id: "WORKER",
          },
        ],
      },
      {
        key: "gender",
        placeholder: "Select Gender",
        defaultValue: "",
        type: "dropdown",
        options: [
          {
            label: "Male",
            id: "MALE",
          },
          {
            label: "Female",
            id: "FEMALE",
          },
        ],
      },
    ],
    btn: "Register",
    linkLbl1: "Already have an account? ",
    linkLbl2: "login here",
    link: "/login",
  });

  const onSubmit = async (params: Object) => {
    const { err } = await ApiProxy.getInstance().register(
      params as {
        firstname: string;
        secondname: string;
        email: string;
        password: string;
        gender_id: number;
        position_id: number;
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

export default Register;
