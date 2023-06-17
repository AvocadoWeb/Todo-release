import { useState } from 'react'

import './NewTaskForm.css'

export default function NewTaskForm({ onAddItem }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(Number(e.target.value))
  }

  const onSecChange = (e) => {
    setSec(Number(e.target.value))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim() === '') return
    onAddItem(label, min, sec)
    setLabel('')
    setMin('')
    setSec('')
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input type="submit" style={{ display: 'none' }} />
      <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinChange}
        value={min}
        min="0"
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecChange}
        value={sec}
        min="0"
        max="60"
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onLabelChange: () => {},
  onSubmit: () => {},
  onMinChange: () => {},
  onSecChange: () => {},
}
