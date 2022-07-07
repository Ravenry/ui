import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigStatus } from "../Atoms";

export default {
  title: "Atoms/Big Status",
  component: BigStatus,
  argTypes: {
    statusOptions: {
      options: [
        "Freelancer needed",
        "Awaiting freelancers",
        "Ready to recommend",
        "Recommendation sent",
        "Awaiting payment",
        "Work in progress",
        "Job submitted",
        "Job completed",
      ],
      control: { type: "select" },
    }, // Automatically inferred when 'options' is defined
    status: { type: "number", min: 0, max: 7 },
  },
} as ComponentMeta<typeof BigStatus>;

const Template: ComponentStory<typeof BigStatus> = (args) => (
  <BigStatus {...args} />
);

export const bigStatus = Template.bind({});
bigStatus.args = {
  status: 5,
  statusOptions: [
    "Freelancer needed",
    "Awaiting freelancers",
    "Ready to recommend",
    "Recommendation sent",
    "Awaiting payment",
    "Work in progress",
    "Job submitted",
    "Job completed",
  ],
};
