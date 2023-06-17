import { Component } from 'react'

import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'
import { Provider } from '../../context'

import './App.css'

export default class App extends Component {
  maxId = 99

  state = {
    todoData: [],
    filter: 'all',
  }

  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
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

  addItem = (label, min, sec) => {
    const newItem = this.createTodoItem(label, min, sec)

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

  filterItems() {
    const { todoData, filter } = this.state
    if (filter === 'active') {
      this.filter += 'active'
      return todoData.filter((el) => el.checked !== true)
    }
    if (filter === 'completed') {
      this.filter += 'completed'
      return todoData.filter((el) => el.checked === true)
    }
    this.filter += 'all'
    return todoData
  }

  clearCompleted = () => {
    this.state.todoData.forEach((el) => {
      if (el.checked) {
        this.deleteItem(el.id)
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
        <Provider value={{ todoData }}>
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
              onClear={this.clearCompleted}
              filter={filter}
              selectionFilter={this.selectionFilter}
              onFilterClick={this.statusListener}
            />
          </div>
        </Provider>
      </div>
    )
  }
}
