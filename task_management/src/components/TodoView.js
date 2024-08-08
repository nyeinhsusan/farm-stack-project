import React from 'react'
import TodoItem from './TodoItem'

const TodoView = (props) => {
  return (
    <div>
        <ul>
            {props.todolist.map((todo)=><TodoItem key={todo.title} todo={todo}/>)}
        </ul>
    </div>
  )
}

export default TodoView