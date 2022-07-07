import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon, Tooltip } from "../Atoms";

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const tooltip = Template.bind({});
tooltip.args = {
  position: { top: "40px", right: "-15px" },
  textStyle: {
    width: "253px",
    textAlign: "left",
    fontSize: "10px",
  },
  arrowPosition: "top",
  wrapText: true,
  content:
    'This button will notify the client and trigger the job status to "Work Submitted". Make sure that already upload or submitted the finished job on the Attachment.',
  children: <Icon name="warning" clickable />,
};
