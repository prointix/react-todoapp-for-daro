import React from "react";

const TodoForm = (props) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(input);
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <h1>Todo List</h1>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
            placeholder="Add a todo"
          />
          <button type="submit" className="todo-button">
            Add
          </button>
      </form>
    </>
  );
};

export default TodoForm;
