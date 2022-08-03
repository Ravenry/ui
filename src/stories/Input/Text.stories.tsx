import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../../Atoms";

export default {
  title: "Atoms/Input/Text",
  component: Input.Text,
  argTypes: {
    error: {
      control: "boolean",
      defaultValue: false,
    },
    success: {
      control: "boolean",
      defaultValue: false,
    },
    borderRadius: {
      defaultValue: "5px",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input.Text>;

const Template: ComponentStory<typeof Input.Text> = (args) => (
  <Input.Text {...args} />
);

export const inputText = Template.bind({});

inputText.args = {};
