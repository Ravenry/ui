import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon, Row, Spacer, Tag, Text } from "../Atoms";

export default {
  title: "Atoms/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => (
  <Row>
    <Tag {...args} />
  </Row>
);

export const tag = Template.bind({});
tag.args = {
  height: "32px",
  style: { marginRight: "16px", marginBottom: "16px" },
  clickable: true,
  children: (
    <>
      <Row alignItems="center">
        <Text _as="b3">Suggestions</Text>
        <Spacer size="20" />
        <Icon name="plus" />
      </Row>
    </>
  ),
};
