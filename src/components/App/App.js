import { Component } from 'react'

import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [],
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      checked: false,
      id: this.maxId++,
      edit: false,
      date: new Date(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]

      return {
        todoData: newArr,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, checked: !oldItem.checked }

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit }
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  editSubmit = (event, id) => {
    event.preventDefault()
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((data) => data.id === id)
      const oldData = todoData[index]
      const newData = {
        ...oldData,
        edit: !oldData.edit,
        label: event.target.querySelector('input').value,
      }
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  selectionFilter = (filter) => {
    this.setState({ filter })
  }

  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((el) => !el.checked)
      case 'completed':
        return items.filter((el) => el.checked)
      default:
        return items
    }
  }

  clearCompleted = () => {
    this.state.todoData.forEach((element) => {
      if (element.checked) {
        this.deleteItem(element.id)
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const doneCount = todoData.filter((el) => el.checked).length
    const todoCount = todoData.length - doneCount
    const visibleItems = this.filterItems(todoData, filter)
    return (
      <div className="todoapp">
        <AppHeader onAddedItem={this.addItem} />
        <div className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEdit={this.editItem}
            editSubmit={this.editSubmit}
          />
          <Footer
            todoCount={todoCount}
            creationTime={this.getCreationTime}
            onClear={this.clearCompleted}
            filter={filter}
            selectionFilter={this.selectionFilter}
          />
        </div>
      </div>
    )
  }
}
