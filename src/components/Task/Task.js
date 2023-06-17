import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default function Task({
  label,
  edit,
  checked,
  id,
  date,
  onDeleted,
  onToggleCompleted,
  onEdit,
  editSubmit,
  min,
  sec,
}) {
  const [value, setValue] = useState(label)
  const [activeTimer, setActiveTimer] = useState(false)
  const [secs, setSecs] = useState(sec)
  const [mins, setMins] = useState(min)

  useEffect(() => {
    if (sec === '') setSecs(0)
    if (min === '') setMins(0)
    if (checked) setActiveTimer(false)

    if (activeTimer) {
      const interval = setInterval(() => {
        if (secs > 0) {
          setSecs((s) => s - 1)
        }
        if (secs === 0 && mins !== 0) {
          setSecs((s) => s + 59)
          setMins((m) => m - 1)
        } else if (secs <= 0 && mins === 0) {
          setActiveTimer(false)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [sec, min, checked, activeTimer, secs, mins])

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const startTimer = () => {
    setActiveTimer(true)
  }
  const stopTimer = () => {
    setActiveTimer(false)
  }

  const editing = (
    <li className="editing">
      <form onSubmit={editSubmit}>
        <input autoFocus type="text" value={value} onChange={onChange} className="edit" />
      </form>
    </li>
  )

  return edit ? (
    editing
  ) : (
    <li className={checked ? 'completed' : edit ? 'editing' : null}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={checked} onChange={onToggleCompleted} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description timer-container">
            <button
              aria-label="play-button"
              onClick={startTimer}
              type="button"
              className="icon icon-play"
              disabled={activeTimer}
            />
            <button
              aria-label="pause-button"
              type="button"
              onClick={stopTimer}
              className="icon icon-pause"
              disabled={!activeTimer}
            />
            <span className="timer">
              {` ${mins}`}:{`${secs}`}
            </span>
          </span>
          <span className="description">
            created{' '}
            {formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}
          </span>
        </label>
        <button aria-label="edit-button" type="button" className="icon icon-edit" onClick={onEdit} />
        <button aria-label="destroy-button" type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  )
}

Task.defaultProps = {
  editTodoSubmit: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  editTodoSubmit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
}
