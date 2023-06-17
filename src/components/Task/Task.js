import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

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

  onSubmit = (event) => {
    event.preventDefault()
    const {
      editItem,
      todo: { id },
    } = this.props
    editItem(id, this.state.label)

    this.setState({
      label: '',
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
          <input id={id} className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">
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
