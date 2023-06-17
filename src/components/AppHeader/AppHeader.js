import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './AppHeader.css'

const AppHeader = ({ onAddedItem }) => {
  return (
    <header className="header">
      <h1>Todos</h1>
      <NewTaskForm onAddedItem={onAddedItem} />
    </header>
  )
}

AppHeader.defaultProps = {
  onAddedItem: () => {},
}

AppHeader.propTypes = {
  onAddedItem: PropTypes.func,
}

export default AppHeader
