import Header from "./Todo Components/Header";
import TodoTask from "./Todo Components/TodoTask";
import NewTodo from "./Todo Components/NewTodo";
import { useState, useEffect } from "react";
import TodoList from "./Todo Components/TodoList";
import { v4 as id } from "uuid";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CompletedTodoList from "./Todo Components/CompletedTodoList";

function App() {
  const TODO_LISTS_STORAGE_KEY = "todoLists";
  const [todoLists, setTodoLists] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    const storedTodoList = JSON.parse(
      localStorage.getItem(TODO_LISTS_STORAGE_KEY)
    );
    if (storedTodoList) setTodoLists(storedTodoList);
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LISTS_STORAGE_KEY, JSON.stringify(todoLists));
  }, [todoLists]);

  const toDosHandler = (todo) => {
    setTodoLists([...todoLists, { id: id(), todo }]);
  };

  const completedTodoHandler = (id) => {
    const newTodo = todoLists.filter((todo) => todo.id !== id);
    const completedTodo = todoLists.filter((todo) => todo.id === id);
    setTodoLists(newTodo);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <TodoList
                  todoLists={todoLists}
                  completedTodoHandler={completedTodoHandler}
                />
                <CompletedTodoList todoLists={completedTodo} />
              </>
            }
          />
          <Route
            path="/newTodo"
            element={<NewTodo toDosHandler={toDosHandler} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
