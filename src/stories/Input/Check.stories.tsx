import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../../Atoms";

export default {
  title: "Atoms/Input/Check",
  component: Input.Check,
  argTypes: {
    error: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    checked: {
      control: "boolean",
      defaultValue: false,
    },
    checkedSome: {
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input.Check>;

const Template: ComponentStory<typeof Input.Check> = (args) => (
  <Input.Check {...args} />
);

export const inputText = Template.bind({});

inputText.args = {};
