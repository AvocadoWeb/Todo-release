import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'
import { Consumer } from '../../context'

import './Task.css'

export default class Task extends Component {
  state = {
    value: this.props.label,
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const { label, edit, checked, id, date, onDeleted, onToggleCompleted, onEdit, editSubmit } = this.props
    const editing = (
      <li className="editing">
        <form onSubmit={editSubmit}>
          <input autoFocus type="text" value={this.state.value} onChange={this.onChange} className="edit" />
        </form>
      </li>
    )

    return edit ? (
      editing
    ) : (
      <li className={checked ? 'completed' : this.props.edit ? 'editing' : null}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={checked} onChange={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <Consumer>
              {({ todoData }) => {
                const { min, sec } = todoData.filter((el) => el.id === id)[0]
                return <Timer min={Number(min)} sec={Number(sec)} checked={checked} />
              }}
            </Consumer>
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
}

Task.defaultProps = {
  editSubmit: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  editSubmit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
}
