import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";
import { Text } from "../";

const Root = styled(Text)`
  padding: 2px 4px;
  background-color: ${colors.statsBlue10};
  border-radius: 5px;
`;
export default function RequiredLabel() {
  return (
    <Root _as="s6" color="statsBlue100" inline>
      Required
    </Root>
  );
}
