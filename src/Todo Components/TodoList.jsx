import React from "react";
import { useNavigate } from "react-router-dom";

export default function TodoList(props) {
  const { todoLists, completedTodoHandler } = props;
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
      <div
        key={todo.id}
        className="flex items-center  mv1 pa2  bb b--lightest-blue"
      >
        <div>
          <input
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
          <div className="f3 ml ">{todo.todo.title}</div>
          <div className="mt2">Assignee : {todo.todo.assignTo}</div>
        </div>
      </div>
    );
  });

  return (
    <section className="shadow-1 mt3 pa4 mw6 center ">
      <div>
        <h2 className="f2 ">Todo List ({todoLists.length})</h2>
        {todoListsElement}
      </div>
    </section>
  );
}
