import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../Atoms";

export default {
  title: "Atoms/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const containedButton = Template.bind({});
containedButton.args = {
  variant: "contained",
  color: "blue",
  children: "View rating",
};

export const outlinedButton = Template.bind({});
outlinedButton.args = {
  variant: "outlined",
  color: "blue",
  children: "View rating",
};

export const textButton = Template.bind({});
textButton.args = {
  variant: "text",
  color: "blue",
  children: "View rating",
};
