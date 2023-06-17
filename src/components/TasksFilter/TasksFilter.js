import { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends Component {
  filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, selectionFilter } = this.props
    const filterButtons = this.filterButtons.map(({ name, label }) => {
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
}

TasksFilter.defaultProps = {
  selectionFilter: () => {},
}

TasksFilter.propTypes = {
  selectionFilter: PropTypes.func,
}
