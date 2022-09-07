import React from "react";

const Todolist = (props) => {
  const { todo, removeTodo, completeTodo, toggleTodo } = props;

  return (
    <>
      <div
        type="all"
        className={todo.completed ? "todo-row complete" : "todo-row"}
      >
        <p id="word-cross">{todo.text}</p>

        <div className="iconsContainer">
          {todo.completed ? (
            <button id="not-done-btn" onClick={() => completeTodo(todo.id)}>
              Not Done
            </button>
          ) : (
            <button id="done-btn" onClick={() => toggleTodo(todo.id)}>
              Done
            </button>
          )}
          &nbsp;&nbsp;
          <button
            id="remove-btn"
            style={{ marginRight: 5 }}
            onClick={() => removeTodo(todo.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <hr className="seperator" />
    </>
  );
};

export default Todolist;
