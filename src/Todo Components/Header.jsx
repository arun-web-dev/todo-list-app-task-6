import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ currentUser }) {
  const navigate = useNavigate();
  const navigationHandler = () => {
    navigate("/newTodo");
  };
  return (
    <header className="mw6 center">
      <nav className="flex justify-around items-end pv3">
        <div>
          <h2 className="logo f2">Todo App</h2>
        </div>
        {currentUser === "admin" && (
          <div>
            <button
              onClick={navigationHandler}
              className="f5 flex items-center   br1  bw1 ph3 pv2  dib pointer sign-out-btn "
            >
              <span className="f5 b mr2 pb1 dib ">+</span> Add New Todo
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
