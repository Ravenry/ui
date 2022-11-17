import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BorderedButtonContainer from "./BorderedButtonContainer";

export default {
  title: "Molecules/BorderedButtonContainer",
  component: BorderedButtonContainer,
} as ComponentMeta<typeof BorderedButtonContainer>;

const Template: ComponentStory<typeof BorderedButtonContainer> = (args) => (
  <BorderedButtonContainer {...args} />
);

export const standard = Template.bind({});

standard.args = {
  children: "Click Me",
};
