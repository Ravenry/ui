import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Avatar } from "../Atoms";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      options: ["large", "big", "medium", "small"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    saved: { control: "boolean" },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const largeSizeWithUrl = Template.bind({});
largeSizeWithUrl.args = {
  size: "large",
  saved: false,
  url: "https://cdn.idntimes.com/content-images/community/2020/12/130302964-1340448236297642-54889249978656421-n-cb7fc610b5dd67da09ab982931f2df21-688571a140a583ad837453da0fe5f6a8_600x400.jpg",
};

export const bigSizeWithName = Template.bind({});
bigSizeWithName.args = {
  size: "big",
  saved: false,
  name: "Hari",
};

export const mediumSize = Template.bind({});
mediumSize.args = {
  size: "medium",
  saved: false,
};

export const smallSize = Template.bind({});
smallSize.args = {
  size: "small",
  saved: false,
};

export const savedAvatar = Template.bind({});
savedAvatar.args = {
  size: "small",
  saved: true,
};
