import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompletedTodoList(props) {
  const {
    todoLists,
    backToTodoListsHandler,
    deleteCompletedTodoHandler,
    currentUser,
  } = props;
  const [showTodo, setShowTodo] = useState(false);
  const naviagte = useNavigate();
  const todoHandler = (todo) => {
    naviagte("/newTodo", { state: { todo } });
  };
  const todoListsElement = todoLists.map((todo) => {
    return (
      <div
        key={todo.id}
        className="flex items-center todo-list-item mv2 pa2 br3 bg-moon-gray pa2  bb b--black-10"
      >
        <div>
          <input
            className="pointer"
            type="checkbox"
            onClick={() => backToTodoListsHandler(todo)}
            name="todocheck"
            id="todocheck"
          />
        </div>
        <div
          className="flex flex-column ml4 pointer"
          onClick={() => todoHandler(todo)}
        >
          <div className="f3 reset fw4 monaco strike ">{todo.todo.title}</div>
          <div className="mt1  f5  monaco strike">
            Assignee : {todo.todo.assignTo}
          </div>
        </div>
        {currentUser === "admin" && (
          <div
            className="trash-icon"
            onClick={() => deleteCompletedTodoHandler(todo.id)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </div>
        )}
      </div>
    );
  });

  const viewTodos = () => setShowTodo(!showTodo);

  return (
    <section className="shadow-4 mt3 pa4 mw6 center ">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="f3">
            Completed {todoLists.length > 0 ? `(${todoLists.length})` : ""}
          </h2>
          {todoLists.length > 0 && (
            <i
              className={
                showTodo
                  ? "fa-solid f2 pointer fa-circle-chevron-up"
                  : "fa-solid f2 pointer fa-circle-chevron-down"
              }
              onClick={viewTodos}
            ></i>
          )}
        </div>
        <div
          className={
            todoLists.length > 0 && showTodo && "todo-list todo-list-active"
          }
        >
          {showTodo && todoListsElement}
        </div>
      </div>
    </section>
  );
}
