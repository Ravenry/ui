import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RequiredLabel } from "../Atoms";

export default {
  title: "Atoms/RequiredLabel",
  component: RequiredLabel,
} as ComponentMeta<typeof RequiredLabel>;

const Template: ComponentStory<typeof RequiredLabel> = () => <RequiredLabel />;

export const requiredLabel = Template.bind({});
