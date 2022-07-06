import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

type BadgeProps = {
  number?: number;
  square?: boolean;
  isHidden?: boolean;
  children: React.ReactNode;
};

const Root = styled.div<BadgeStyleProps>`
  ${({ isHidden }) => (isHidden ? "visibility: hidden;" : "")}
  min-width: 20px;
  height: 20px;
  border-radius: ${({ square }) => (square ? "5px" : "20px")};
  color: ${colors.white};
  text-align: center;
  line-height: 20px;
  background-color: ${colors.red100};
`;

/**
 * Badge
 *
 * @param {Object} props -
 * @param {Number} [props.number] - number to display
 * @param {Boolean} [props.square] - flag to make badge as rounded square
 */
export default function Badge(props: BadgeProps) {
  const { square } = props;

  return (
    <Root {...props} square={square}>
      {props.children}
    </Root>
  );
}

type BadgeStyleProps = {
  number?: number;
  square?: boolean;
  isHidden?: boolean;
};
