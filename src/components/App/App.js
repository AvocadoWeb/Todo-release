import { useState } from 'react'

import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  const createTodoItem = (label, min, sec) => ({
    label,
    min,
    sec,
    checked: false,
    id: new Date(),
    edit: false,
    date: new Date(),
  })

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)

      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    })
  }

  const addItem = (label, min, sec) => {
    const newItem = createTodoItem(label, min, sec)

    setTodoData(() => [...todoData, newItem])
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, checked: !oldItem.checked }

      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    })
  }

  const editItem = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit }
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    })
  }

  const editSubmit = (event, id) => {
    event.preventDefault()
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldData = todoData[idx]
      const newData = {
        ...oldData,
        edit: !oldData.edit,
        label: event.target.querySelector('input').value,
      }
      return [...todoData.slice(0, idx), newData, ...todoData.slice(idx + 1)]
    })
  }

  const selectionFilter = (filter) => {
    setFilter(filter)
  }

  const filterItems = () => {
    if (filter === 'active') {
      return todoData.filter((el) => !el.checked)
    }
    if (filter === 'completed') {
      return todoData.filter((el) => el.checked)
    }
    return todoData
  }

  const clearCompleted = () => {
    todoData.forEach((el) => {
      if (el.checked) {
        deleteItem(el.id)
      }
    })
  }

  const doneCount = todoData.filter((el) => el.checked).length
  const todoCount = todoData.length - doneCount
  const visibleList = filterItems(todoData, filter)

  return (
    <div className="todoapp">
      <AppHeader onAddItem={addItem} />
      <div className="main">
        <TaskList
          todos={visibleList}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEdit={editItem}
          editSubmit={editSubmit}
        />
        <Footer todoCount={todoCount} onClear={clearCompleted} filter={filter} selectionFilter={selectionFilter} />
      </div>
    </div>
  )
}
