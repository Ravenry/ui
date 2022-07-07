import React from "react";
import { Modal, Row, Button, Spacer, Rating, Input, Text } from "../Atoms";

export default {
  title: "Atoms/Modal",
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const modal = Template.bind({});
modal.args = {
  open: true,
  children: (
    <>
      <Text _as="s3" bold>
        Review given
      </Text>
      <Spacer size="16" display="block" />

      <Text _as="b3" color="black40">
        JOB TITLE
      </Text>
      <Spacer size="8" display="block" />

      <Text _as="b3" bold>
        TITLE
      </Text>

      <Spacer size="16" display="block" />

      <Text _as="b3" color="black40">
        RATING GIVEN
      </Text>
      <Spacer size="8" display="block" />
      <Rating value={4} />

      <Spacer size="16" display="block" />

      <Text _as="b3" color="black40">
        COMMENT GIVEN
      </Text>
      <Input.Textarea
        minRows={5}
        fluid
        noBorder
        disabled
        padding="0"
        value="good work"
      />

      <Spacer size="8" display="block" />

      <Row justifyContent="flex-end">
        <Button color="green" variant="outlined">
          Close
        </Button>
      </Row>
    </>
  ),
};
