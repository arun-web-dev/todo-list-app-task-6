import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoList(props) {
  const { todoLists, completedTodoHandler } = props;
  const [showTodo, setShowTodo] = useState(false);
  const naviagte = useNavigate();
  const todoHandler = (todo) => {
    naviagte("/newTodo", { state: { todo } });
  };
  const checkboxHandler = (e) => {
    e.preventDefault();
    completedTodoHandler(e.target.id);
  };
  const todoListsElement = todoLists.map((todo) => {
    return (
      <div key={todo.id} className="flex items-center  mv1 pa2  bb b--black-10">
        <div>
          <input
            className="pointer"
            type="checkbox"
            onClick={checkboxHandler}
            name="todocheck"
            id={todo.id}
          />
        </div>
        <div
          className="flex flex-column ml4 pointer"
          onClick={() => todoHandler(todo)}
        >
          <h5 className="f3 reset fw4 monaco">{todo.todo.title}</h5>
          <p className="mt1 f5  monaco">Assignee : {todo.todo.assignTo}</p>
        </div>
      </div>
    );
  });
  const viewTodos = () => setShowTodo(!showTodo);
  return (
    <section className="shadow-4 mt3 pa4 mw6 center ">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="f3">To-do List ({todoLists.length})</h2>
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
            showTodo && todoLists.length > 0 && "todo-list todo-list-active"
          }
        >
          {showTodo && todoListsElement}
        </div>
      </div>
    </section>
  );
}
