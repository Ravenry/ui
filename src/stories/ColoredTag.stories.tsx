import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ColoredTag } from "../Atoms";

export default {
  title: "Atoms/ColoredTag",
  component: ColoredTag,
} as ComponentMeta<typeof ColoredTag>;

const Template: ComponentStory<typeof ColoredTag> = (args) => (
  <ColoredTag {...args} />
);

export const coloredTag = Template.bind({});
coloredTag.args = {
  width: "140px",
  color: "lightBlue",
  children: "Finding Freelancer",
};
