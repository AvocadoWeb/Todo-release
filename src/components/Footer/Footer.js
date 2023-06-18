import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

import './Footer.css'

export default function Footer({ todoCount, onClear, filter, selectionFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count"> {todoCount} items left</span>
      <TasksFilter filter={filter} selectionFilter={selectionFilter} />
      <button type="button" onClick={onClear} className="clear-completed">
        Clear completed beta12
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  selectionFilter: () => {},
  onClear: () => {},
}

Footer.propTypes = {
  selectionFilter: PropTypes.func,
  onClear: PropTypes.func,
}
