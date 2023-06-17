import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mins: this.props.min,
      secs: this.props.sec,
      activeTimer: false,
    }
  }

  componentDidUpdate() {
    const { activeTimer } = this.state
    if (activeTimer) {
      this.updateTimer()
    }
  }

  updateTimer = () => {
    const { mins, secs } = this.state
    const { checked } = this.props
    if (secs < 0) {
      this.setState((prev) => ({
        secs: 59,
        mins: prev.mins - 1,
      }))
    }
    if (mins === 0 && secs <= 0) {
      this.stopTimer()
    }
    if (checked) {
      this.stopTimer()
    }
  }

  startTimer = () => {
    const { mins, secs } = this.state
    if (secs === 0) {
      this.setState({
        secs: 59,
        mins: mins - 1,
      })
    }
    this.setState({
      activeTimer: true,
    })
    this.interval = setInterval(() => {
      this.setState((prev) => ({
        secs: prev.secs - 1,
      }))
    }, 1000)
  }

  stopTimer = () => {
    this.setState({
      activeTimer: false,
    })
    clearInterval(this.interval)
  }

  render() {
    const { activeTimer, mins, secs } = this.state

    return (
      <>
        <span className="description timer-container">
          <button
            aria-label="play-button"
            onClick={this.startTimer}
            type="button"
            className="icon icon-play"
            disabled={activeTimer}
          />
          <button
            aria-label="pause-button"
            type="button"
            onClick={this.stopTimer}
            className="icon icon-pause"
            disabled={!activeTimer}
          />
          <span className="timer">
            {` ${mins}`}:{`${secs}`}
          </span>
        </span>
      </>
    )
  }
}

Timer.propTypes = {
  min: PropTypes.number,
  sec: PropTypes.number,
  activeTimer: PropTypes.bool,
  updateTimer: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  checked: PropTypes.bool,
}
