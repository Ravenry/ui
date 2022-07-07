import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Spacer, Button, Container } from "../Atoms";

export default {
  title: "Atoms/Container",
  component: Container,
  argTypes: {
    justify: { control: "boolean" },
    end: { control: "boolean" },
    start: { control: "boolean" },
  },
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);

export const container = Template.bind({});
container.args = {
  flex: true,
  end: true,
  fluid: true,
  children: (
    <>
      <Button color="blue" variant="outlined">
        Cancel
      </Button>
      <Spacer size="16" />
      <Button color="blue">Submit</Button>
    </>
  ),
};
