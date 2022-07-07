import React from "react";
import { NavItem, Row } from "../Atoms";

export default {
  title: "Atoms/NavItem",
  component: NavItem,
};

const Template = (args) => (
  <Row>
    <NavItem {...args} />
  </Row>
);

export const navItemActive = Template.bind({});
navItemActive.args = {
  active: true,
  children: "Nav Item",
  outlined: false,
};

export const navItemNotActive = Template.bind({});
navItemNotActive.args = {
  active: false,
  children: "Nav Item",
  outlined: false,
};

export const navItemOutline = Template.bind({});
navItemOutline.args = {
  active: false,
  children: "Nav Item",
  outlined: true,
};
