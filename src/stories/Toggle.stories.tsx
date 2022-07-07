import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Toggle } from "../Atoms";

export default {
  title: "Atoms/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const toggleChecked = Template.bind({});
toggleChecked.args = {
  checked: true,
  disabled: false,
};

export const toggleUnchecked = Template.bind({});
toggleUnchecked.args = {
  checked: false,
  disabled: false,
};

export const toggleDisabled = Template.bind({});
toggleDisabled.args = {
  checked: false,
  disabled: true,
};
