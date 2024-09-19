import React from 'react'
import { TODO_option_ICON } from '@/constants/icon'


const TodoFilter = ({ option, onFilter }) => {

  const filterTodo = (event) => onFilter(event.target.value);

  return (
    <select className="p-2 text-gray-100 bg-gray-800 rounded"
      data-cy="todo-filter"
      // TODO
      value={option}
      onChange={filterTodo}
    >
      <option value="ALL">All</option>
      <option value="TODO">{TODO_option_ICON.TODO} To do</option>
      <option value="PROGRESS">{TODO_option_ICON.PROGRESS} On progress</option>
      <option value="DONE">{TODO_option_ICON.DONE} Done</option>
    </select>
  )
}

export default TodoFilter