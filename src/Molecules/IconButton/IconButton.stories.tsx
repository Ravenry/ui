import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IconButton from "./IconButton";

export default {
  title: "Molecules/IconButton",
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const standard = Template.bind({});

standard.args = {
  color: "blue",
  hoverColor: "blue",
  disabled: false,
  active: true,
  solid: true,
  onClick: () => alert("clicked"),
};
