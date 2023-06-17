import PropTypes from 'prop-types'

import './TasksFilter.css'

export default function TasksFilter({ filter, selectionFilter }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]
  const filterButtons = buttons.map(({ name, label }) => {
    const filterName = filter === name ? 'selected' : null
    return (
      <li key={name}>
        <button type="button" onClick={() => selectionFilter(name)} className={`${filterName}`}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{filterButtons}</ul>
}

TasksFilter.defaultProps = {
  selectionFilter: () => {},
}

TasksFilter.propTypes = {
  selectionFilter: PropTypes.func,
}
