import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Emoticon } from "../Atoms";

export default {
  title: "Atoms/Emoticon",
  component: Emoticon,
  argTypes: {
    value: { type: "number", min: 1, max: 5 },
  },
} as ComponentMeta<typeof Emoticon>;

const Template: ComponentStory<typeof Emoticon> = (args) => (
  <Emoticon {...args} />
);

export const emoticon = Template.bind({});
emoticon.args = {
  value: 3,
};
