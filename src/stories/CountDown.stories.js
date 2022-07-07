import React from "react";
import { CountDown } from "../Atoms";

export default {
  title: "Atoms/Countdown",
  component: CountDown,
};

const Template = (args) => <CountDown {...args} />;

export const countDown = Template.bind({});
countDown.args = {
  color: "blue",
  initialTime: 10000000,
};
