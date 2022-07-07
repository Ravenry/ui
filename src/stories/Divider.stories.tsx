import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Divider, Text } from "../Atoms";

export default {
  title: "Atoms/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const divider = Template.bind({});
divider.args = {
  color: "black10",
  children: (
    <Text _as="b3" color="black40">
      or
    </Text>
  ),
};
