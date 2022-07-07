import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UnreadDot } from "../Atoms";

export default {
  title: "Atoms/UnreadDot",
  component: UnreadDot,
  argTypes: {
    square: { control: "boolean" },
  },
} as ComponentMeta<typeof UnreadDot>;

const Template: ComponentStory<typeof UnreadDot> = (args) => (
  <UnreadDot {...args} />
);

export const unreadHidden = Template.bind({});
unreadHidden.args = {
  isHidden: true,
};

export const unreadVisible = Template.bind({});
unreadVisible.args = {
  isHidden: false,
};
