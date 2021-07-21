import { faBuilding, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import fs from "fs";

import "../../static/styles/UserProfile.scss";
import ImageModal from "./ImageModal/ImageModal";

interface UserProfile {
  fname: String;
  lname: String;
  gender: Gender | undefined;
  inSchool: boolean;
}

enum Gender {
  Male = "M",
  Female = "F",
  NotToSay = "N",
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fname: "",
    lname: "",
    gender: undefined,
    inSchool: false,
  });

  const [{ alt, src }, setImg] = useState({
    src: "",
    alt: "",
  });

  const [hidden, setHidden] = useState<boolean>(true);

  const [inSchool, setInSchool] = useState<boolean>(false);

  const handleProfileChange = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setProfile({ ...profile, [name]: value });
  };

  const handleInSchoolStyle = (flag: boolean) => {
    if (flag) {
      return {
        color: "white",
        backgroundColor: "black",
      };
    } else {
      return {
        color: "black",
        backgroundColor: "white",
      };
    }
  };

  const handleImgClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  const submitProfile = () => {
    const reader = new FileReader();
    reader.readAsDataURL()
  };

  return (
    <div className="profile-container">
      <div className="profile-form-container">
        <h1 className="profile-title">User Profile</h1>
        <form className="profile-form">
          <table className="profile-form-table">
            <tbody>
              <tr>
                <td>
                  <label className="profile-form-label">First Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter Your First Name"
                    className="profile-form-input"
                    onChange={handleProfileChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="profile-form-label">Last Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Enter Your Last Name"
                    className="profile-form-input"
                    onChange={handleProfileChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="profile-form-label">Gender:</label>
                </td>
                <td className="radio-grp">
                  <label htmlFor="male" className="profile-form-radio-label">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value={Gender.Male}
                      className="profile-form-radio"
                      onChange={handleProfileChange}
                    />
                    Male
                  </label>

                  <label htmlFor="female" className="profile-form-radio-label">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value={Gender.Female}
                      className="profile-form-radio"
                      onChange={handleProfileChange}
                    />
                    Female
                  </label>

                  <label htmlFor="none" className="profile-form-radio-label">
                    <input
                      type="radio"
                      id="none"
                      name="gender"
                      value={Gender.NotToSay}
                      className="profile-form-radio"
                      onChange={handleProfileChange}
                    />
                    Prefer not to say
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="profile-form-label">
                    Current in School
                  </label>
                </td>
                <td>
                  <div
                    className="inschool-switch"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setInSchool(!inSchool);
                      setProfile({ ...profile, inSchool: !inSchool });
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSchool}
                      style={handleInSchoolStyle(inSchool)}
                      className="inschool-icon"
                    />
                    <span style={{ color: "transparent", padding: "10px" }} />
                    <FontAwesomeIcon
                      icon={faBuilding}
                      style={handleInSchoolStyle(!inSchool)}
                      className="inschool-icon"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <label className="profile-form-label">Profile Picture</label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple={false}
                    onChange={(e: React.FormEvent<EventTarget>) => {
                      const target = e.target as HTMLInputElement;
                      var file = target!.files![0];
                      if (file) {
                        var url = URL.createObjectURL(file);
                        setImg({
                          src: url,
                          alt: file.name,
                        });
                      }
                    }}
                  />
                  <br />
                  <div className="upload-image">
                    <img
                      src={src}
                      alt={alt}
                      className="preview-img"
                      hidden={src ? false : true}
                      onClick={handleImgClicked}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div id="button-center">
          <button className="submit-button" onClick={submitProfile}>
            Done
          </button>
        </div>
      </div>
      {/* make sure hidden is triggered in ImageModal */}
      {hidden ? null : (
        <ImageModal src={src} alt={alt} toggle={handleImgClicked} />
      )}
    </div>
  );
};

export default UserProfile;
