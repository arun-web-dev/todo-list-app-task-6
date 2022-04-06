import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";

class NewTodo extends Component {
  navigate = this.props.navigate;
  location = this.props.location;
  viewTodo = this.props?.location?.state?.todo;
  title = this.props.location.state?.todo.todo.title;
  details = this.props.location.state?.todo.todo.details;
  assignTo = this.props.location.state?.todo.todo.assignTo;

  state = {
    title: this.title && "",
    details: this.details && "",
    assignTo: this.assignTo && "",
    isLoaded: "true",
  };

  onchangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { title, details, assignTo } = this.state;
    if (!title && !details && !assignTo) return;
    this.props.toDosHandler(this.state);
    this.setState({
      title: "",
      details: "",
      assignTo: "",
    });
    this.navigate("/");
  };

  navigationHandler = (e) => {
    e.preventDefault();
    this.navigate("/");
  };

  selectOptionHandler = (e) => {
    e.preventDefault();
    this.setState({
      assignTo: e.target.value,
    });
  };

  render() {
    const { title, details, assignTo, viewTodo } = this;
    return (
      <form
        className="pa4 black-80 mw6 center mt3 shadow-1 new-todo new-todo-loaded"
        onSubmit={this.onSubmitHandler}
      >
        <div className="measure">
          <div>
            <label htmlFor="title" className="f5 fw6 b db mb2">
              Title
            </label>
            <input
              id="title"
              className="input-reset code ba b--black-20 pa2 mt1 mb2 db w-100"
              type="text"
              name="title"
              value={title}
              placeholder="New task title"
              onChange={this.onchangeHandler}
              disabled={viewTodo}
            />
          </div>
          <div>
            <label htmlFor="details" className="f5 b fw6 db mt3 mb2">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={details}
              className="db  hover-black w-100 measure mt1 ba b--black-20 pa2 br2 mb2  w-100 textarea"
              placeholder="Add details"
              onChange={this.onchangeHandler}
              disabled={viewTodo}
            ></textarea>
          </div>
          <div className="mt3 w-100 ">
            <label htmlFor="assignTo" className="f5 b fw6 db mt3 mb2">
              {viewTodo ? "Assigned To" : "Assign To"}
            </label>
            <select
              id="assignTo"
              name="assignTo"
              className="w-100 pa2 bg-white black code"
              defaultValue={assignTo ? assignTo : "Assign To"}
              onChange={this.selectOptionHandler}
            >
              <option disabled>Assign To</option>
              <option disabled={viewTodo} value="Arun" className="code f4 mv1">
                Arun
              </option>
              <option disabled={viewTodo} value="Riyas" className="code f4 mv1">
                Riyas
              </option>
              <option
                disabled={viewTodo}
                value="Sathish"
                className="code f4 mv1"
              >
                Sathish
              </option>
            </select>
          </div>
          <div>
            {!viewTodo && (
              <button className="f5 br1 ba bw1 ph3 pv2 mt3 dib pointer sign-out-btn">
                Add
              </button>
            )}

            <button
              onClick={this.navigationHandler}
              className={
                viewTodo
                  ? "f5  br1 ba bw1 ph3 pv2 mt3 dib pointer sign-out-btn"
                  : "f5  br1 ba bw1 ph3 ml2 pv2 mt3 dib pointer sign-out-btn"
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default function (props) {
  const navigate = useNavigate();
  const location = useLocation();

  return <NewTodo {...props} navigate={navigate} location={location} />;
}
