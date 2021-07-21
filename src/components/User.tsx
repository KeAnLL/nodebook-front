import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useState, useEffect, FC, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "../../static/styles/User.scss";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

interface User {
  username: String;
  email: String;
  password: String;
}

const User: FC = () => {
  // line under input box
  const usernameRef: React.RefObject<HTMLDivElement> = useRef(null);
  const emailRef: React.RefObject<HTMLDivElement> = useRef(null);

  const formRef: React.RefObject<HTMLFormElement> = useRef(null);

  const usernameInputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [usernameErr, setUsernameErr] = useState<boolean>();

  const [emailErr, setEmailErr] = useState<boolean>();

  const [useDefault, setUseDefault] = useState<boolean>(false);

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      await axios
        .get("./api/user/query/byname", {
          params: {
            username: e.target.value,
          },
        })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            setUsernameErr(false);
            usernameRef.current!.innerHTML = "Username OK!";
          } else {
            // for future extend
            console.trace("Unhandled response status");
          }
        })
        .catch((err: AxiosError) => {
          setUsernameErr(true);
          usernameRef.current!.innerHTML = err.response!.data.msg;
        });
    } else {
      setUsernameErr(true);
      usernameRef.current!.innerHTML = "Username required!";
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      await axios
        .get("./api/user/query/bymail", {
          params: {
            email: e.target.value,
          },
        })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            setEmailErr(false);
            emailRef.current!.innerHTML = "Email OK!";
          } else {
            console.trace("Unhandled response status");
          }
        })
        .catch((err: AxiosError) => {
          setEmailErr(true);
          emailRef.current!.innerHTML = err.response!.data.msg;
        });
    } else {
      setEmailErr(true);
      emailRef.current!.innerHTML = "Email required!";
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (user.password == e.target.value) {
      console.log("Same");
    } else {
      console.log("NO!");
    }
  };

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUseDefault(!useDefault);
    usernameInputRef.current!.value = user.email.split("@")[0];
  };

  const borderInColor = (flag: Boolean | undefined): String => {
    return flag != undefined ? (flag ? "red" : "rgb(0, 199, 0)") : "black";
  };

  const useDefaultUsername = () => {};

  const submitUser = () => {
    const requestOptions = {
      headers: { "content-type": "application/json" },
    };

    console.log(user);

    axios
      .post("./api/user/create", user, requestOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    formRef.current!.reset();
    setUsernameErr(undefined);
    setEmailErr(undefined);

    usernameRef.current!.innerHTML = "&nbsp;";
    emailRef.current!.innerHTML = "&nbsp;";

    setUseDefault(false);
    usernameInputRef.current!.focus();
  };

  return (
    <div className="user-container">
      <div className="user-form-outbox">
        {/* sign up segment */}
        <div className="user-form-container uf-container-left">
          <h1 className="user-title">Sign Up</h1>
          <form className="user-form" ref={formRef}>
            <table className="user-form-table">
              <tbody>
                <tr>
                  <td />
                  <td style={{ textAlign: "left" }}>
                    <label style={{ paddingRight: "10px" }}>
                      Use Default Username
                    </label>
                    <input
                      type="checkbox"
                      id="defaultUsername"
                      name="defaultUsername"
                      checked={useDefault}
                      onChange={handleDefaultChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="user-form-label" htmlFor="username">
                      Username
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                      className="user-form-input"
                      required={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUser({
                          ...user,
                          username: e.target.value,
                        });
                      }}
                      style={{ borderColor: `${borderInColor(usernameErr)}` }}
                      onBlur={handleUsernameChange}
                      disabled={useDefault}
                      ref={usernameInputRef}
                    />
                    <br />
                    <div
                      className="user-form-line"
                      style={{ color: `${borderInColor(usernameErr)}` }}
                      ref={usernameRef}
                    >
                      &nbsp;
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="user-form-label" htmlFor="email">
                      Email
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter E-mail"
                      className="user-form-input"
                      required={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUser({
                          ...user,
                          email: e.target.value,
                        });
                      }}
                      style={{ borderColor: `${borderInColor(emailErr)}` }}
                      onBlur={handleEmailChange}
                    />
                    <br />
                    <span
                      className="user-form-line"
                      ref={emailRef}
                      style={{ color: `${borderInColor(emailErr)}` }}
                    >
                      &nbsp;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="user-form-label" htmlFor="password">
                      Password
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="user-form-input"
                      onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUser({
                          ...user,
                          password: e.target.value,
                        });
                      }}
                    />
                    <br />
                    <span className="user-form-line">&nbsp;</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label
                      className="user-form-label"
                      htmlFor="password-repeat"
                    >
                      Repeat Password
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password-repeat"
                      name="password-repeat"
                      placeholder="Enter Repeat Password"
                      className="user-form-input"
                      // required={true}
                      onBlur={checkPassword}
                    />
                    <br />
                    <span className="user-form-line">&nbsp;</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </form>
          <div id="button-center">
            <button onClick={resetForm} className="reset-button">
              Reset
            </button>
            <button onClick={submitUser} className="submit-button">
              Submit
            </button>
          </div>
        </div>

        {/* login segment */}
        <div className="user-form-container uf-container-right">
          <h1 className="user-title">Login</h1>
          <form className="user-form" ref={formRef}>
            <table className="user-form-table">
              <tbody>
                <tr>
                  <td>
                    <label className="user-form-label" htmlFor="email">
                      Email
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter E-mail"
                      className="user-form-input"
                      required={true}
                    />
                    <br />
                    <span
                    // className="user-form-line"
                    // ref={emailRef}
                    // style={{ color: `${borderInColor(emailErr)}` }}
                    >
                      &nbsp;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="user-form-label" htmlFor="password">
                      Password
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="user-form-input"
                    />
                    <br />
                    <span className="user-form-line">&nbsp;</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </form>
          <div id="button-center">
            <button onClick={resetForm} className="reset-button">
              Reset
            </button>
            <button onClick={submitUser} className="submit-button">
              Submit
            </button>
          </div>
        </div>

        {/* <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default User;
