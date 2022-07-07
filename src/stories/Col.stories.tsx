import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Text, Spacer, Button, Col } from "../Atoms";

export default {
  title: "Atoms/Col",
  component: Col,
} as ComponentMeta<typeof Col>;

const Template: ComponentStory<typeof Col> = (args) => <Col {...args} />;

export const col = Template.bind({});
col.args = {
  children: (
    <>
      <Text _as="b2" bold>
        Don&apos;t have any suitable freelancers?
      </Text>
      <Text _as="b2" color="black80">
        Allow our team to recommend you new freelancers from our network.
      </Text>
      <Spacer size="8" />

      <Button color="purple" width="242px">
        Ask for recommendation
      </Button>
    </>
  ),
};
