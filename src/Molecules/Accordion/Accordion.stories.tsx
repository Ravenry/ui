import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Accordion from "./Accordion";

export default {
  title: "Molecules/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const stadndard = Template.bind({});

stadndard.args = {
  title: "Accordion",
  content: "Accordion Content",
  defaultOpen: false,
  chevronColor: "#004790",
  chevronHoverColor: "",
  chevronDirectionOptions: { open: "up", closed: "down" },
  chevronOnRight: true,
  noHover: true,
  headerHeight: "",
  headerPadding: "",
  headerBackground: "",
  headerHoverBackground: "",
  headerBorderRadius: "",
  contentOverflow: "",
  onClickHeader: null,
  autoClosed: "",
  divider: true,
  offsetDivider: "0",
  marginTop: "20px",
  chevronContainerHover: false,
  disableClickTarget: null,
  disableContentChange: false,
  contentArrayLength: 0,
  contentHeight: "",
};
