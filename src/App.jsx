import Header from "./Todo Components/Header";
import NewTodo from "./Todo Components/NewTodo";
import { useState, useEffect } from "react";
import TodoList from "./Todo Components/TodoList";
import { v4 as uuidV4 } from "uuid";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CompletedTodoList from "./Todo Components/CompletedTodoList";
import Navigation from "./Todo Components/Navigation";
import SignIn from "./Todo Components/SignIn";
import { Users } from "./API/Users";

function App() {
  const TODO_LISTS_STORAGE_KEY = "todoLists";
  const COMPLETED_LISTS_STORAGE_KEY = "completedTodos";
  const [todoLists, setTodoLists] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [filteredTodoLists, setfilteredTodoLists] = useState([]);
  const [completedFilteredTodoLists, setcompletedFilteredTodoLists] = useState(
    []
  );
  const [currentUser, setCurrentUser] = useState("");

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
  }, [todoLists, completedTodo]);

  useEffect(() => {
    const filterTodo = todoLists.filter((todo) => {
      return todo.todo.assignTo.toLowerCase() === currentUser;
    });

    setfilteredTodoLists(filterTodo);
  }, [currentUser, todoLists]);

  useEffect(() => {
    const filterTodo = completedTodo.filter((todo) => {
      return todo.todo.assignTo.toLowerCase() === currentUser;
    });

    setcompletedFilteredTodoLists(filterTodo);
  }, [currentUser, completedTodo]);

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

  const deleteCompletedTodoHandler = (id) => {
    const filteredTodo = completedTodo.filter((todo) => todo.id !== id);
    setCompletedTodo(filteredTodo);
  };

  const backToTodoListsHandler = (id) => {
    const newTodo = completedTodo.filter((todo) => todo.id !== id.id);
    setCompletedTodo(newTodo);

    setTodoLists([...todoLists, id]);
  };

  const navigationHandler = (value) => {
    setIsSignedIn(value);
  };

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const protectedRouteHandler = () => {
    const authenticated =
      localStorage.getItem("authenticated")?.toString() === "true";
    if (!authenticated) {
      return <SignIn users={Users} updateCurrentUser={updateCurrentUser} />;
    } else {
      return (
        <>
          <Navigation
            navigationHandler={navigationHandler}
            currentUser={currentUser}
          />
          <Header currentUser={currentUser} />
          <TodoList
            todoLists={currentUser === "admin" ? todoLists : filteredTodoLists}
            completedTodoHandler={completedTodoHandler}
          />
          <CompletedTodoList
            todoLists={
              currentUser === "admin"
                ? completedTodo
                : completedFilteredTodoLists
            }
            backToTodoListsHandler={backToTodoListsHandler}
            deleteCompletedTodoHandler={deleteCompletedTodoHandler}
            currentUser={currentUser}
          />
        </>
      );
    }
  };
  const newTodoRouteHandler = () => {
    const authenticated =
      localStorage.getItem("authenticated")?.toString() === "true";
    if (!authenticated) {
      return <SignIn users={Users} updateCurrentUser={updateCurrentUser} />;
    } else {
      return <NewTodo toDosHandler={toDosHandler} />;
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={
              <SignIn users={Users} updateCurrentUser={updateCurrentUser} />
            }
          />
          <Route path="/" element={protectedRouteHandler()} />
          <Route path="/newTodo" element={newTodoRouteHandler()} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
