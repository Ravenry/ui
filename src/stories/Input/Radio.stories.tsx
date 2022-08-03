import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../../Atoms";

export default {
  title: "Atoms/Input/Radio",
  component: Input.Radio,
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
  },
} as ComponentMeta<typeof Input.Radio>;

const Template: ComponentStory<typeof Input.Radio> = (args) => (
  <Input.Radio {...args} />
);

export const inputText = Template.bind({});

inputText.args = {};
