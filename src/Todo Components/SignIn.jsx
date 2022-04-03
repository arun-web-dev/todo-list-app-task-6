import React, { useState, useEffect } from "react";

export default function SignIn(props) {
  const [account, setAccount] = useState({
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    value: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, password } = account;
    if (!name && !password) {
      setErrorMessage((prevState) => ({
        value: "username or password is empty",
      }));
      alert("username or password is empty");
    } else if (
      name.toLocaleLowerCase() === "admin" &&
      password.toLocaleLowerCase() === "admin"
    ) {
      localStorage.setItem("authenticated", "true");
      window.location.pathname = "/";
    } else {
      setErrorMessage((prevState) => ({
        value: "Invalid usename or password",
      }));
      alert("Invalid usename or password");
      return;
    }
  };
  const updateAccount = (e) => {
    const { name, value } = e.target;
    setAccount((prevState) => {
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
  return (
    <div className=" center sign-in-form ">
      <main className="pa4 br2 shadow-2 mw6 center black-80 mt3 sign-in-card ">
        <div>
          <h2 className="logo tc w-100 f2">Todo App</h2>
        </div>
        <form className="measure center mt2" onSubmit={onSubmitHandler}>
          <fieldset
            id="sign_up"
            className="ba b--transparent hover-pointer ph0 mh0"
          >
            <legend className="f3 mt2 fw6 center ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Username
              </label>
              <input
                onChange={updateAccount}
                className="pa2 input-reset ba bg-transparent   w-100"
                type="name"
                name="name"
                id="name"
                value={account.name}
                placeholder="enter your name"
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
          </fieldset>

          <div className="">
            <input
              className="b ph3 pv2 input-reset sign-out-btn pointer f6 dib"
              type="submit"
              value="Sign in"
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
    </div>
  );
}
