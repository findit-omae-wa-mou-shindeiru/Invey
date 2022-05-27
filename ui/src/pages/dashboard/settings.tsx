import { Dashboard } from "layout";
import styles from "styles/dashboard/settings.module.css";
import { UploadImg } from "components";
import { useState } from "react";
import { IUserDetail } from "interfaces";
import Dropdown from "react-bootstrap/Dropdown";

const defaultUserDetail = (): IUserDetail => {
  return {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    bio: "",
    position: "",
    gender: "",
  };
};

const positionOptions = ["Student", "Worker", "Teacher"];

const genderOptions = ["Male", "Female"];

const Setting = () => {
  const [file, setFile] = useState<File | undefined>();
  const [userDetail, setUserDetail] = useState<IUserDetail>(
    defaultUserDetail()
  );
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const saveChange = () => {
    console.log("userDetail", userDetail);
    console.log("password", password);
    console.log("newPassword", newPassword);
    console.log("file", file);
  };

  return (
    <Dashboard>
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
                      <Dropdown.Toggle variant="primary" id="dropdown-position">
                        {userDetail.position
                          ? userDetail.position
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
                              {position}
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
                          ? userDetail.gender
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
                              {gender}
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
    </Dashboard>
  );
};

export default Setting;
