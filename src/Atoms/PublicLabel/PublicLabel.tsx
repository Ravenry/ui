import React from "react";
import styled from "styled-components";
import colors from "../utils/colors";
import { Text } from "../";

const PublicBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 18px;
  padding: 3px 5px;
  border-radius: 10px 0;
  background-color: ${colors.purple100};
`;

export default function PublicLabel() {
  return (
    <PublicBadge>
      <Text _as="btn3" bold color="backgroundWhite">
        PUBLIC
      </Text>
    </PublicBadge>
  );
}
