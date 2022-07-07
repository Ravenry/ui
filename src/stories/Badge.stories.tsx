import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Badge } from "../Atoms";

export default {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    square: { control: "boolean" },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const squareBadge = Template.bind({});
squareBadge.args = {
  square: true,
};

export const notSquareBadge = Template.bind({});
notSquareBadge.args = {
  square: false,
};

export const numberBadge = Template.bind({});
numberBadge.args = {
  number: 5,
};

export const hiddenBadge = Template.bind({});
hiddenBadge.args = {
  isHidden: true,
};
