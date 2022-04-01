import React from "react";
import { useNavigate } from "react-router-dom";

export default function CompletedTodoList(props) {
  console.log(props);
  const { todoLists } = props;
  const naviagte = useNavigate();
  const todoHandler = (todo) => {
    naviagte("/newTodo", { state: { todo } });
  };
  const todoListsElement = todoLists.map((todo) => {
    return (
      <div
        key={todo.id}
        className="flex items-center  mv1 pa2  bb b--lightest-blue"
      >
        <div>
          <input type="checkbox" checked name="todocheck" id="todocheck" />
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
        <h2 className="f2 ">Completed ({todoLists.length})</h2>
        {todoListsElement}
      </div>
    </section>
  );
}
