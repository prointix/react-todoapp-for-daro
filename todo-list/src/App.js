import { clear } from '@testing-library/user-event/dist/clear'
import React, {useState, useEffect} from 'react'
import "./App.css"
import Todo from './Component/Todo'
import Todolist from './Component/Todolist'



const App = () => {
  const [todos, setTodos] = useState([])
  const LOCAL_STORAGE_KEY= 'todoList.app'
  const [status,setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

    //check if the input is already existed in the local storage
    
    //addTodo
    const addTodo = (text) => {
      let id = 1;
      if(todos.length > 0) {
        id = todos[0].id + 1
      }
      if(text === '') {
        return}

      let todo = {id: id, text: text, completed: false}
      let newTodos = [todo, ...todos]
      setTodos(newTodos)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     
    };
    useEffect (() => {
      filterHandler()
    }, [todos,status])

    useEffect(() => {
      const retriveTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(retriveTodos) setTodos(retriveTodos)
    }, [])

    const test = () =>{
      console.log('hello world')
    }

  const removeTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    // remove from local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    
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
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  const clearAll = () =>{
    setTodos([])
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
      <div className='bottom-detail' >
        <span id="left-item"> {todos.filter(todo => !todo.completed).length} items left</span>
        <button id='all' onClick={statusHandler} value="All">All</button>
        <button id='Active' onClick={statusHandler} value= "Active">Active</button>

        <button id='Completed' onClick={statusHandler} value="Completed">Completed</button>
        <button id='Clear' onClick={statusHandler} value="deleteCompletedTodo">Clear All</button>
      </div>
    </div>
  );
}

export default App