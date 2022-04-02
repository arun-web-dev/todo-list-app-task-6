import Header from "./Todo Components/Header";
import NewTodo from "./Todo Components/NewTodo";
import { useState, useEffect } from "react";
import TodoList from "./Todo Components/TodoList";
import { v4 as uuidV4 } from "uuid";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CompletedTodoList from "./Todo Components/CompletedTodoList";
import Navigation from "./Todo Components/Navigation";
import SignIn from "./Todo Components/SignIn";

function App() {
  const TODO_LISTS_STORAGE_KEY = "todoLists";
  const COMPLETED_LISTS_STORAGE_KEY = "completedTodos";
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [todoLists, setTodoLists] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    const storedTodoList = JSON.parse(
      localStorage.getItem(TODO_LISTS_STORAGE_KEY)
    );
    const completedStoredList = JSON.parse(
      localStorage.getItem(COMPLETED_LISTS_STORAGE_KEY)
    );
    if (completedStoredList) setCompletedTodo(completedStoredList);
    if (storedTodoList) setTodoLists(storedTodoList);
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LISTS_STORAGE_KEY, JSON.stringify(todoLists));
  }, [todoLists]);
  useEffect(() => {
    localStorage.setItem(
      COMPLETED_LISTS_STORAGE_KEY,
      JSON.stringify(completedTodo)
    );
  }, [todoLists]);

  const toDosHandler = (todo) => {
    setTodoLists([...todoLists, { id: uuidV4(), todo }]);
  };

  const completedTodoHandler = (id) => {
    const newTodo = todoLists.filter((todo) => todo.id !== id);
    const completedTodoList = todoLists.filter((todo) => todo.id === id);
    setTodoLists(newTodo);
    if (completedTodoList)
      setCompletedTodo([...completedTodo, ...completedTodoList]);
  };

  const backToTodoListsHandler = (id) => {
    const newTodo = completedTodo.filter((todo) => todo.id !== id.id);
    setCompletedTodo(newTodo);

    setTodoLists([...todoLists, id]);
  };

  const navigationHandler = (value) => {
    setIsSignedIn(value);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                <SignIn navigationHandler={navigationHandler} />
              ) : (
                <>
                  <Navigation navigationHandler={navigationHandler} />
                  <Header />
                  <TodoList
                    todoLists={todoLists}
                    completedTodoHandler={completedTodoHandler}
                  />
                  <CompletedTodoList
                    todoLists={completedTodo}
                    backToTodoListsHandler={backToTodoListsHandler}
                  />
                </>
              )
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
