import React from "react";
import { Button } from "../";
// import CountdownTimer from "timer-countdown";
import CountdownTimer from "./CountdownTimer";

export default function CountDown(props) {
  const completed = () => null;

  const timer = {
    timeLeft: props.initialTime, // time in milliseconds
    completeCallback: completed(), // function to be invoked when the countdown timer finishes
    // tickCallback: tick(props.initialTime),
  };

  return (
    props.initialTime !== 0 && (
      <Button fluid color={props.color ? props.color : "yellow"}>
        {props.text ? props.text : "Time to respond"} &nbsp;
        <CountdownTimer {...timer} style={{ backgroundColor: "red" }} />
      </Button>
    )
  );
}
