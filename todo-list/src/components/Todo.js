import React from 'react'

const Todo = (props) => {

    const [input, setInput] = React.useState('')
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addTodo(input)
    }
    return (
      <form onSubmit={handleSubmit}  className="todo-form">
        <input
          value= {input}
          onChange={e => setInput(e.target.value)}
          className="todo-input"
          placeholder="Add a todo"
        />
        <button type="submit" className="todo-button" >Add</button>
      </form>
    );
}

export default Todo