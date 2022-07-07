import React from "react";
import { NavItemMobile } from "../Atoms";

export default {
  title: "Atoms/NavItemMobile",
  component: NavItemMobile,
};

const Template = (args) => <NavItemMobile {...args} />;

export const navItemActive = Template.bind({});
navItemActive.args = {
  active: true,
  children: "Nav Item",
};

export const navItemNotActive = Template.bind({});
navItemNotActive.args = {
  active: false,
  children: "Nav Item",
};
