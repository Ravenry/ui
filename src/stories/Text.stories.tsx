import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Text } from "../Atoms";

export default {
  title: "Atoms/Text",
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const text = Template.bind({});
text.args = {
  _as: "h4",
  color: "black40",
  children: "Send Feedback",
};
