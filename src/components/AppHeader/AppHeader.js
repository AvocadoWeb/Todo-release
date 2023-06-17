import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './AppHeader.css'

export default function AppHeader({ onAddItem }) {
  return (
    <header className="header">
      <h1>Todos</h1>
      <NewTaskForm onAddItem={onAddItem} />
    </header>
  )
}

AppHeader.defaultProps = {
  onAddItem: () => {},
}

AppHeader.propTypes = {
  onAddItem: PropTypes.func,
}
