import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { A } from "../Atoms";

export default {
  title: "Atoms/A",
  component: A,
  argTypes: {
    newTab: { control: "boolean" },
  },
} as ComponentMeta<typeof A>;

const Template: ComponentStory<typeof A> = (args) => <A {...args} />;

export const newTab = Template.bind({});

newTab.args = {
  href: "https://google.com",
  newTab: true,
  children: "This is My First Link with new tab",
};

export const notNewTab = Template.bind({});
notNewTab.args = {
  href: "https://google.com",
  newTab: false,
  children: "This is My First Link without new tab",
};
