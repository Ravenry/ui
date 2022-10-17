import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AttachmentBox from "./AttachmentBox";

export default {
  title: "Molecules/AttachmentBox",
  component: AttachmentBox,
} as ComponentMeta<typeof AttachmentBox>;

const Template: ComponentStory<typeof AttachmentBox> = (args) => <AttachmentBox {...args} />;

export const standard = Template.bind({});

standard.args = {
    mimeType: "application/vnd.ms-powerpoint",
    linkUrl: "http://www.solos.work",
    title: "Filename",
    tag: false,
    onDelete: () => alert("OnDelete Fired"),
    width: "",
    onClick: () => alert("OnClick Fired"),
    jobId: "123",
    documentId: "123",
    backgroundColor: "black100",
    variant: "",
    hideVariant: false,
    fileSize: "submitWork",
    customMargin: "",
    amplitudeEvent: () => alert("Amplide Event"),
    className: "",
};
