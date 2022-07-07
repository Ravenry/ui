import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FullscreenLoading } from "../Atoms";

export default {
  title: "Atoms/FullscreenLoading",
  component: FullscreenLoading,
  argTypes: {
    open: { control: "boolean" },
  },
} as ComponentMeta<typeof FullscreenLoading>;

const Template: ComponentStory<typeof FullscreenLoading> = (args) => (
  <FullscreenLoading {...args} />
);

export const fullScreenLoading = Template.bind({});
fullScreenLoading.args = {
  children: "Loading",
  open: true,
};
