import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SSOButton } from "../Atoms";

export default {
  title: "Atoms/SSOButton",
  component: SSOButton,
} as ComponentMeta<typeof SSOButton>;

const Template: ComponentStory<typeof SSOButton> = (args) => (
  <SSOButton {...args} />
);

export const linkedinButton = Template.bind({});
linkedinButton.args = {
  ssoType: "linkedin",
  children: "Log in with LinkedIn",
  type: "submit",
};

export const googleButton = Template.bind({});
googleButton.args = {
  ssoType: "google",
  children: "Log in with Google",
  type: "submit",
};

export const facebookButton = Template.bind({});
googleButton.args = {
  ssoType: "facebook",
  children: "Log in with Google",
  type: "submit",
};

