import React from "react";
import { NewLabel, Row } from "../Atoms";

export default {
  title: "Atoms/NewLabel",
  component: NewLabel,
};

const Template = (args) => (
  <Row>
    <NewLabel {...args} />
  </Row>
);

export const newLabel = Template.bind({});
