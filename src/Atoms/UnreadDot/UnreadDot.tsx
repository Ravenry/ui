import styled from "styled-components";

import colors from "../utils/colors";

interface UnreadDotProps {
  isHidden?: boolean;
}

const UnreadDot = styled.div<UnreadDotProps>`
  ${({ isHidden }) => (isHidden ? "visibility: hidden;" : "")}
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.red100};
`;

export default UnreadDot;
