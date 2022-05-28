import { useRouter } from "next/router";
import { Auth } from "layout";
import { ApiProxy } from "services";
import { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getInitialData = async () => {
      const {res, err} = await ApiProxy.getInstance().getInitialData("survey-filters")!;

      if (err || !res) {
        alert(err)
        return
      }

      if (res!.status == 200) {
        setContent({
          ...content,
          inputs: [
            ...content.inputs,
            {
              key: "position_id",
              placeholder: "Select Position",
              defaultValue: "",
              type: "dropdown",
              options: res.data.audience.map((a:any) => ({
                label: a.name,
                id: a.id
              }))
            },
            {
              key: "gender_id",
              placeholder: "Select Gender",
              defaultValue: "",
              type: "dropdown",
              options: res.data.gender.map((g:any) => ({
                label: g.name,
                id: g.id
              }))
            }
          ]
        })
      } else {
        alert(res.data)
      }
      setLoading(false)
    }
    getInitialData()
  }, [])

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
  }

 return loading ? <div/> : <Auth content={content} registerCallback={onSubmit} />;
};

export default Register;
