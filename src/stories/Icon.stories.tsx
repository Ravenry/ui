import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "../Atoms";

export default {
  title: "Atoms/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const icon = Template.bind({});
icon.args = {
  name: "search",
  clickable: true,
  hover: true,
  hoverFill: "black100",
};
