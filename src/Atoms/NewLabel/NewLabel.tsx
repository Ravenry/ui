import React, { ReactNode } from "react";
import styled from "styled-components";
import colors from "../utils/colors";
import { Text } from "../";

const newColor = colors as any;
const NewBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 18px;
  padding: 3px 5px;
  border-radius: 10px 0;
  background-color: ${(props) =>
    props.color ? newColor[props.color] : colors.red90};
`;

interface Props {
  children: ReactNode;
  color: string;
}

export default function NewLabel(props: Props) {
  return (
    <NewBadge {...props}>
      <Text _as="btn3" bold color="backgroundWhite">
        {props.children ? props.children : "NEW"}
      </Text>
    </NewBadge>
  );
}
