import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NewCard from "./NewCard";

export default {
  title: "Molecules/NewCard",
  component: NewCard,
} as ComponentMeta<typeof NewCard>;

const Template: ComponentStory<typeof NewCard> = (args) => <NewCard {...args} />;

export const standard = Template.bind({});

standard.args = {
    isMobile: false,
    noMargin: false,
    column: "row",
    borderTop: "0",
    shadow: "0",
    noHover: false,
    shadowOnHover: false,
    children:"CardContent"
};
