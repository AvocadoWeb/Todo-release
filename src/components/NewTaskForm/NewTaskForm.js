import { Component } from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange(e) {
    this.setState({
      min: Number(e.target.value),
    })
  }

  onSecChange(e) {
    this.setState({
      sec: Number(e.target.value),
    })
  }

  onSubmit = (e) => {
    const { label, min, sec } = this.state
    e.preventDefault()
    if (label.trim() === '') return
    this.props.onAddedItem(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input type="submit" style={{ display: 'none' }} />
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => this.onLabelChange(e)}
          value={label}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e) => this.onMinChange(e)}
          value={min}
          min="0"
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e) => this.onSecChange(e)}
          value={sec}
          min="0"
          max="60"
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onLabelChange: () => {},
  onSubmit: () => {},
  onMinChange: () => {},
  onSecChange: () => {},
}
