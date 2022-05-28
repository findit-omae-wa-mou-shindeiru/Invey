import { Dashboard } from "layout";
import styles from "styles/dashboard/settings.module.css";
import { UploadImg, Loading } from "components";
import { useState, useEffect } from "react";
import { IUserDetail } from "interfaces";
import Dropdown from "react-bootstrap/Dropdown";
import { ApiProxy } from "services";

const defaultUserDetail = (): IUserDetail => {
  return {
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    position: null,
    gender: null,
  };
};

const positionOptions = [
  {
    id: 0,
    name: "Student",
  },
  { id: 1, name: "Worker" },
  { id: 2, name: "Teacher" },
];

const genderOptions = [
  { id: 0, name: "Male" },
  { id: 1, name: "Female" },
];

const Setting = () => {
  const [file, setFile] = useState<File | undefined>();
  const [userDetail, setUserDetail] = useState<IUserDetail>(
    defaultUserDetail()
  );
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [genderOptions, setGenderOptions] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [positionOptions, setPositionOptions] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const fetchData = async () => {
    const { res, err } = await ApiProxy.getInstance().get("user/profile");

    if (err || !res) {
      alert(err);
      return;
    }
    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setUserDetail({
      firstname: data.firstname as string,
      lastname: data.secondname as string,
      email: data.email as string,
      bio: data.bio as string,
      position: data.position as { id: number; name: string },
      gender: data.gender as { id: number; name: string },
    });
  };

  const fetchDropdownOptions = async () => {
    const { res, err } = await ApiProxy.getInstance().get("survey-filters");

    if (err || !res) {
      alert(err);
      return;
    }
    if (res.status !== 200) {
      alert(res.data);
      return;
    }

    const { data } = res;
    setGenderOptions(data.gender);
    setPositionOptions(data.audience);
  };

  const fetchAll = async () => {
    setIsLoading(true);
    await fetchData();
    await fetchDropdownOptions();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const saveChange = async () => {
    setIsLoading(true);
    const newProfile = {
      firstname: userDetail.firstname,
      secondname: userDetail.lastname,
      email: userDetail.email,
      bio: userDetail.bio,
      position_id: userDetail.position?.id,
      gender_id: userDetail.gender?.id,
      password: newPassword ? newPassword : undefined,
    }

    const { res, err } = await ApiProxy.getInstance().put("user/profile", newProfile);

    if (err || !res) {
      alert(err);
    }
    if (res?.status !== 200) {
      alert(res?.data);
    }

    setIsLoading(false);
  };

  return (
    <Dashboard>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container + " d-flex mt-3"}>
          <div className={styles.leftContainer}>
            <div className={styles.generalFormContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>General Information</div>
              </div>
              <div className={styles.formContainer}>
                <div className={styles.fullNameForm}>
                  <div className={styles.formLabel}>Full Name</div>
                  <div className={styles.inputContainer + " d-flex"}>
                    <div className={styles.firstNameInput}>
                      <input
                        type="text"
                        value={userDetail.firstname}
                        onChange={(e) => {
                          setUserDetail({
                            ...userDetail,
                            firstname: e.target.value,
                          });
                        }}
                        placeholder="Enter First Name"
                      />
                    </div>
                    <div className={styles.lastNameInput}>
                      <input
                        type="text"
                        value={userDetail.lastname}
                        onChange={(e) => {
                          setUserDetail({
                            ...userDetail,
                            lastname: e.target.value,
                          });
                        }}
                        placeholder="Enter Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.emailForm}>
                  <div className={styles.formLabel}>Email</div>
                  <div className={styles.emailInput}>
                    <input
                      type="text"
                      value={userDetail.email}
                      onChange={(e) => {
                        setUserDetail({
                          ...userDetail,
                          email: e.target.value,
                        });
                      }}
                      className="w-100"
                      placeholder="john.doe@gmail.com"
                    />
                  </div>
                </div>
                <div className={styles.changePasswordForm}>
                  <div className={styles.formLabel}>Change Password</div>
                  <div className={styles.inputContainer + " d-flex"}>
                    <div className={styles.passwordInput}>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Current Password"
                      />
                    </div>
                    <div className={styles.newPasswordInput}>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.bioContainer}>
                  <div className={styles.formLabel}>Bio</div>
                  <div className={styles.bioInput}>
                    <textarea
                      value={userDetail.bio}
                      onChange={(e) => {
                        setUserDetail({
                          ...userDetail,
                          bio: e.target.value,
                        });
                      }}
                      placeholder="Enter Bio"
                    />
                  </div>
                </div>
                <div className={styles.categoriesForm + " d-flex"}>
                  <div className={styles.positionForm}>
                    <div className={styles.formLabel}>Position</div>
                    <div className={styles.positionInput}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          id="dropdown-position"
                        >
                          {userDetail.position
                            ? // TODO: DELETE + 1
                              positionOptions.find(
                                (o) => o.id === userDetail.position!.id + 1
                              )?.name
                            : "Select Position"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {positionOptions.map((position, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                onClick={() =>
                                  setUserDetail({
                                    ...userDetail,
                                    position: position,
                                  })
                                }
                              >
                                {position.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className={styles.genderForm}>
                    <div className={styles.formLabel}>Gender</div>
                    <div className={styles.genderInput}>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-gender">
                          {userDetail.gender
                            ? // TODO: DELETE + 1
                              genderOptions.find(
                                (o) => o.id === userDetail.gender!.id + 1
                              )?.name
                            : "Select Gender"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {genderOptions.map((gender, idx) => {
                            return (
                              <Dropdown.Item
                                key={idx}
                                onClick={() =>
                                  setUserDetail({
                                    ...userDetail,
                                    gender,
                                  })
                                }
                              >
                                {gender.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    styles.btnContainer + " mt-5 d-flex justify-content-end"
                  }
                >
                  <button
                    className={styles.btnSave}
                    onClick={() => {
                      saveChange();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer + " mx-4"}>
            <UploadImg title="Profile Picture" file={file} setFile={setFile} />
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Setting;
