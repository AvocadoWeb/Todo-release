import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleCompleted, onEdit, editSubmit }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        id={id}
        key={id}
        editSubmit={(event) => editSubmit(event, id)}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEdit={() => onEdit(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  editSubmit: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(Object),
  editSubmit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
}
export default TaskList
