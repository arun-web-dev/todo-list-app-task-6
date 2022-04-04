import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [finalData, setFinalData] = useState([
    {
      details: {
        username: "",
        password: "",
      },
    },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setFinalData([
      {
        details: {
          username: data.Firstname + data.Lastname,
          password: data.password,
        },
      },
    ]);
    localStorage.setItem("authenticated", "true");
    window.location.pathname = "/";
  };

  return (
    <div className=" center sign-up-container form-active">
      <main className="pa4 br2 shadow-2 mw6 center black-80 mt3 sign-in-card ">
        <div>
          <h2 className="logo tc w-100 f2">Todo App</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="measure center mt2">
          <fieldset
            id="sign_up"
            className="ba b--transparent hover-pointer ph0 mh0"
          >
            <legend className="f3 mt2 fw6 center ph0 mh0">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">FirstName</label>
              <input
                className="pa2 input-reset ba bg-transparent   w-100"
                type="text"
                placeholder="Firstname"
                {...register("Firstname", { required: true, maxLength: 20 })}
              />
              <p className="red mt2">
                {errors?.Firstname ? "First name is required" : ""}
              </p>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Lastname</label>
              <input
                type="text"
                placeholder="LastName"
                className="pa2 input-reset ba bg-transparent hover-pointer w-100"
                {...register("Lastname", { required: true, maxLength: 20 })}
              />
              <p className="red mt2">
                {errors?.Lastname ? "Lastname is requred" : ""}
              </p>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                type="password"
                className="pa2 input-reset ba bg-transparent hover-pointer w-100"
                placeholder="password"
                {...register("password", {
                  required: true,
                  pattern: /^[A-Za-z]\w{5,14}$/i,
                })}
              />
              <p className="red mt2">
                {errors?.password ? "Password must be 8 character long" : ""}
              </p>
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset sign-out-btn pointer f6 dib"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
