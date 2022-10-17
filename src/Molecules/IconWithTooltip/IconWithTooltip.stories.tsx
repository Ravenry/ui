import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IconWithTooltip from "./IconWithTooltip";

export default {
  title: "Molecules/IconWithTooltip",
  component: IconWithTooltip,
} as ComponentMeta<typeof IconWithTooltip>;

const Template: ComponentStory<typeof IconWithTooltip> = (args) => (
  <IconWithTooltip {...args} />
);

export const standard = Template.bind({});

standard.args = {
  name: "delete",
  fill: "blue",
  hoverFill: "yellow",
  content: "This is tooltip content",
  position: "bottom",
  arrowPosition: "right",
};
