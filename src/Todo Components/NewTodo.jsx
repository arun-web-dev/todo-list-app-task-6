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

  render() {
    const { title, details, assignTo, viewTodo } = this;
    return (
      <form
        className="pa4 black-80 mw6 center mt3 shadow-1"
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
          <div>
            <label htmlFor="title" className="f5 fw6 b db mb2">
              Assign To
            </label>
            <input
              id="assignTo"
              className="input-reset code ba b--black-20 pa2 mt1 mb2 db w-100"
              type="text"
              name="assignTo"
              value={assignTo}
              placeholder="assign the task to"
              onChange={this.onchangeHandler}
              disabled={viewTodo}
            />
          </div>
          <div>
            {!viewTodo && (
              <button className="f5  dim br1 ba bw1 ph3 pv2 mt3 dib pointer purple ">
                Add
              </button>
            )}

            <button
              onClick={this.navigationHandler}
              className="f5 dim br1 ba bw1 ph3 ml2 pv2 mt3 dib pointer purple "
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
