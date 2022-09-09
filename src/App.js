import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem.js";

const App = () => {
  const [todos, setTodos] = useState([]);
  const LOCAL_STORAGE_KEY = "todoList.app";
  const [status, setStatus] = useState("All");

  const addTodo = (text) => {
    if (text.trim() === "") return alert("Please input some text");
    let todo = { id: uuidv4(), text: text, completed: false };
    let newTodos = [todo, ...todos];
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  useEffect(() => {
    const retriveTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveTodos) setTodos(retriveTodos);
  }, []);

  const saveTocalStorage = (newTodos) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    // remove from local storage
    saveTocalStorage(updatedTodos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveTocalStorage(updatedTodos);
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);

    todo.completed = !todo.completed;
    setTodos(newTodos);
    saveTocalStorage(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (status === "Completed") {
      return todo.completed;
    }
    if (status === "Active") {
      return !todo.completed;
    }
    return todo;
  });

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const deleteCompletedTodo = (event) => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    saveTocalStorage(newTodos);
  };

  return (
    <div className="todo-app">
      <TodoForm addTodo={addTodo} />
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            todo={todo}
            key={todo.id}
          />
        );
      })}
      <div className="controls">
        <span id="left-item">
          {" "}
          {todos.filter((todo) => !todo.completed).length} items left
        </span>
        <div className="filters">
          <button
            value="All"
            className={status === "All" ? "active" : "none"}
            onClick={statusHandler}
            id="all"
          >
            All
          </button>
          <button
            className={status === "Active" ? "active" : "none"}
            id="pending"
            onClick={statusHandler}
            value="Active"
          >
            Active
          </button>
          <button
            className={status === "Completed" ? "active" : "none"}
            id="completed"
            onClick={statusHandler}
            value="Completed"
          >
            Completed
          </button>
        </div>
        <button
          className="clear-button"
          onClick={deleteCompletedTodo}
          value="deleteCompletedTodo"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default App;
