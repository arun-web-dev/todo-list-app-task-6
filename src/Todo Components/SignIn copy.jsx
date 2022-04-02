import { Component } from "react";

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  navigationHandler = this.props.navigationHandler;
  logIntoHomeHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email && !password) return;
    localStorage.setItem(email, JSON.stringify(this.state));
    this.navigationHandler(false);
  };
  updateAccount = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className=" center sign-in-form ">
        <main className="pa4 br2 shadow-2 mw6 center black-80 mt3 sign-in-card ">
          <div>
            <h2 className="logo tc w-100 f2">Todo App</h2>
          </div>
          <form
            className="measure center mt2"
            onSubmit={this.logIntoHomeHandler}
          >
            <fieldset
              id="sign_up"
              className="ba b--transparent hover-pointer ph0 mh0"
            >
              <legend className="f3 mt2 fw6 center ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={this.updateAccount}
                  className="pa2 input-reset ba bg-transparent   w-100"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="enter your email"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.updateAccount}
                  className="pa2 input-reset ba bg-transparent hover-pointer w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
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
            </div>
          </form>
        </main>
      </div>
    );
  }
}
