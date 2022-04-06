import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUp from "./SignUp";

export default function SignIn(props) {
  const { users, updateCurrentUser } = props;
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    value: "",
  });

  const [isSignUpPage, setIsSignUpPage] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, password } = account;
    const validateUser = () => {
      return users.filter((user) => {
        return user.name === name && user.password === password;
      });
    };
    if (!name && !password) {
      setErrorMessage(() => ({
        value: "username or password is empty",
      }));
    } else if (validateUser().length > 0) {
      updateCurrentUser(name);
      localStorage.setItem("authenticated", "true");
      navigate("/");
    } else {
      setErrorMessage(() => ({
        value: "Invalid usename or password",
      }));
      return;
    }
  };
  const updateAccount = (e) => {
    const { name, value } = e.target;
    setAccount(() => {
      return { ...account, [name]: value };
    });
  };

  const clearInputFields = (e) => {
    e.preventDefault();
    setAccount({
      name: "",
      password: "",
    });
  };
  const switchSignIn = () => {
    setIsSignUpPage(false);
  };

  const switchSignUp = () => {
    setIsSignUpPage(true);
  };
  return (
    <div className=" center sign-in-form">
      <div className="flex justify-center items-center">
        <a
          onClick={switchSignIn}
          className={
            !isSignUpPage
              ? " f3 link-rest dib pointer sign sign-active"
              : " f4 link-rest dib pointer sign "
          }
        >
          Login
        </a>
        <a
          onClick={switchSignUp}
          className={
            isSignUpPage
              ? " f3 link-reset  dib pointer ml3 sign sign-active"
              : " f4 link-reset  dib pointer ml3 sign "
          }
        >
          SignUp
        </a>
      </div>
      {!isSignUpPage && (
        <main className="pa4 br2 shadow-2 mw6 center black-80 mt3 sign-in-card  form-active">
          <div>
            <h2 className="logo tc w-100 f2">Todo App</h2>
          </div>
          <form className="measure center mt2" onSubmit={onSubmitHandler}>
            <fieldset
              id="sign_in"
              className="ba b--transparent hover-pointer ph0 mh0"
            >
              <legend className="f3 mt2 fw6 center ph0 mh0">Login</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Username
                </label>
                <input
                  onChange={updateAccount}
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="name"
                  name="name"
                  id="name"
                  value={account.name}
                  placeholder="enter your name"
                  autoComplete="off"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={updateAccount}
                  className="pa2 input-reset ba bg-transparent hover-pointer w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={account.password}
                  placeholder="enter your password"
                />
              </div>
              <div>
                <p className="red f3">{errorMessage.value}</p>
              </div>
            </fieldset>

            <div className="">
              <input
                className="b ph3 pv2 input-reset sign-out-btn pointer f6 dib"
                type="submit"
                value="Login"
              />
              <button
                onClick={clearInputFields}
                className="b ph3 ml2 tc pv2  sign-out-btn pointer reset-btn f6 dib"
              >
                Reset
              </button>
            </div>
          </form>
        </main>
      )}

      {isSignUpPage && <SignUp />}
    </div>
  );
}
