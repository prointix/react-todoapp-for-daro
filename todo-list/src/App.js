import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

import "./App.css"
import Todo from './components/Todo.js'
import Todolist from './components/Todolist.js'



const App = () => {
  const [todos, setTodos] = useState([])
  const LOCAL_STORAGE_KEY= 'todoList.app'
  const [status,setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

    //check if the input is already existed in the local storage

    const addTodo = (text) => {
      if(text === '') return

      let todo = {id: uuidv4(), text: text, completed: false}
      let newTodos = [todo, ...todos]
      setTodos(newTodos)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
    };

    useEffect (() => {
      filterHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[todos,status])

    useEffect(() => {
      const retriveTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(retriveTodos) setTodos(retriveTodos)
    }, [])


  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    // remove from local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
  };
    
  const filterHandler = () => {
    switch(status){
      case 'Completed':
        let notCompletedTodo = todos.filter(todo => todo.completed === true)
        setFilteredTodos(notCompletedTodo)
        break;
      case 'Active':
        let completedTodo =todos.filter(todo => todo.completed === false)
        setFilteredTodos(completedTodo)
        break;
      
      case 'deleteCompletedTodo':
        let deleteCompletedTodo = todos.filter(todo => todo.completed === false)
        setFilteredTodos(deleteCompletedTodo)
        break;
      
      default:
        setFilteredTodos(todos)
        break;
    }
  }

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
  }

  const statusHandler = (e)=>{
    setStatus(e.target.value)
  }
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <Todo addTodo={addTodo}  />
      <hr className="seperator"/>
      {
        filteredTodos.map((todo)=>
        {
          return (
            <Todolist  toggleTodo= {toggleTodo} removeTodo={removeTodo} completeTodo={completeTodo} todo={todo} key={todo.id}/>
          )
        }
        )
      }
        <div className="controls">
        <span id="left-item"> {todos.filter(todo => !todo.completed).length} items left</span>
        <div className="filters">
          <button value="All"  className={ status === "All" ? "active": "none"} onClick={statusHandler} id="all">All</button>
          <button className={ status === "Active" ? "active": "none"}  id="pending" onClick={statusHandler} value="Active">Active</button>
          <button className={ status === "Completed" ? "active": "none"} id="completed" onClick={statusHandler} value="Completed">Completed</button>
        </div>
        <button className={ status === "deleteCompletedTodo" ? "on": "clear-btn"} onClick={statusHandler} value="deleteCompletedTodo" >Clear Completed</button>
      </div>
    </div>
  );
}

export default App