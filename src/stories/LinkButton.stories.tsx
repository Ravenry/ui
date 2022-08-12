import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkButton } from "../Atoms";

export default {
  title: "Atoms/LinkButton",
  component: LinkButton,
  argTypes: {
    primary: { control: "boolean", defaultValue: true },
  },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args}>Clear date</LinkButton>
);

export const linkButton = Template.bind({});

linkButton.args = {
  to: "https://google.com",
};

export const clickable = Template.bind({});
clickable.args = {
  onClick: () => {
    console.log("clicked");
  },
};
