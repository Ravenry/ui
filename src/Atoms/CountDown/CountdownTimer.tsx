import PropTypes from "prop-types";
import React from "react";
import createReactClass from "create-react-class";
import "./CountDown.css";

let is_mounted = false;

const CountdownTimer = createReactClass({
  displayName: "CountDownTimer",
  is_mounted: false,

  propTypes: {
    timeLeft: PropTypes.number.isRequired,
    interval: PropTypes.number,
  },

  getDefaultProps() {
    return {
      interval: 1000,
    };
  },

  getInitialState() {
    return {
      timeRemaining: this.props.timeLeft,
    };
  },

  componentDidMount() {
    is_mounted = true;
    this.startTimer();
  },

  componentDidUpdate() {
    if (!this.state.prevTime && this.state.timeRemaining > 0 && is_mounted) {
      this.startTimer();
    }
  },

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  },

  startTimer() {
    const currentTime = Date.now();
    const differenceInTime = this.getDifferenceInTime(currentTime);
    const { interval } = this.props;
    const timeRemainingInInterval = this.getTimeRemainingInInterval(
      interval,
      differenceInTime
    );
    let timeout = timeRemainingInInterval;
    if (timeRemainingInInterval < interval / 2.0) {
      timeout += interval;
    }
    const timeRemaining = this.getTimeRemaining(differenceInTime);
    const countdownComplete = this.state.prevTime && timeRemaining <= 0;
    if (is_mounted) {
      this.setCurrentState(
        countdownComplete,
        timeout,
        currentTime,
        timeRemaining
      );
    }
    if (countdownComplete && this.props.completeCallback) {
      this.props.completeCallback();
      return;
    }
    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  },

  getDifferenceInTime(currentTime) {
    return this.state.prevTime ? currentTime - this.state.prevTime : 0;
  },

  getTimeRemainingInInterval(interval, differenceInTime) {
    return interval - (differenceInTime % interval);
  },

  getTimeRemaining(differenceInTime) {
    return Math.max(this.state.timeRemaining - differenceInTime, 0);
  },

  setCurrentState(countdownComplete, timeout, currentTime, timeRemaining) {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    this.setState({
      timeoutId: countdownComplete
        ? null
        : setTimeout(this.startTimer, timeout),
      prevTime: currentTime,
      timeRemaining,
    });
  },

  getFormattedTime(milliseconds) {
    const totalSeconds = Math.round(milliseconds / 1000);

    const seconds = parseInt((totalSeconds % 60).toString(), 10);
    const minutes = parseInt((totalSeconds / 60).toString(), 10) % 60;
    const hours = parseInt((totalSeconds / 3600).toString(), 10);

    const ss = seconds < 10 ? `0${seconds}` : seconds;
    const mm = minutes < 10 ? `0${minutes}` : minutes;
    const hh = hours < 10 ? `0${hours}` : hours;

    return `${hh}:${mm}:${ss}`;
  },

  render() {
    const { timeRemaining } = this.state;
    return (
      <span className="timer-wrapper">
        <span className="displayTime">
          {this.getFormattedTime(timeRemaining)}
        </span>
      </span>
    );
  },
});

export default CountdownTimer;
