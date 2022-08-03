import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../../Atoms";

export default {
  title: "Atoms/Input/Textarea",
  component: Input.Textarea,
  argTypes: {
    error: {
      control: "boolean",
      defaultValue: false,
    },
    success: {
      control: "boolean",
      defaultValue: false,
    },
    basic: {
      control: "boolean",
      description: "Set to true to make it autosize",
    },
    borderRadius: {
      defaultValue: "5px",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    maxLength: {
      defaultValue: 20,
    },
    minRows: {
      defaultValue: 3,
    },
    maxRows: {
      defaultValue: 100,
    },
  },
} as ComponentMeta<typeof Input.Textarea>;

const Template: ComponentStory<typeof Input.Textarea> = (args) => (
  <Input.Textarea {...args} />
);

export const inputTextarea = Template.bind({});

inputTextarea.args = {
  basic: true,
};

export const inputTextareaAutosize = Template.bind({});

inputTextareaAutosize.args = {
  basic: false,
};
