import React from "react";
import styled from "styled-components";

import { Segment } from "../../Atoms";
import getElevation from "../../shared/elevations";
import Responsive from "../../shared/responsive";
import { withProps } from "../../shared/withProps";

export interface CardRootProps extends NewCardProps {
  isMobile?: boolean;
  noMargin?: boolean;
  column?: string;
  borderTop?: string;
  shadow?: string;
  noHover?: boolean;
  shadowOnHover?: boolean;
}

const CardRoot = withProps<CardRootProps>()(styled(Segment))`
  margin-bottom: ${({ isMobile, noMargin }) =>
    isMobile ? "24px" : noMargin ? "0" : "24px"};
  padding: ${({ padding }) => padding || "16px"};
  cursor: pointer;
  display: flex;
  width: ${({ isMobile, width }) => (isMobile ? width : "100%")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 10px;"}
  ${({ borderTop }) => (borderTop ? `border-top: ${borderTop};` : "")}
  ${({ shadow }) => (shadow ? `box-shadow: ${shadow};` : getElevation(2))}
  ${({ height }) => (height ? `height: ${height};` : "")}

  ${({ noHover, shadowOnHover }) =>
    noHover
      ? ""
      : `&:hover {
      ${shadowOnHover ? `box-shadow: ${shadowOnHover};` : getElevation(4)}
    }`}
`;

export interface NewCardProps {
  children?: any;
}

export default function Card(props: NewCardProps) {
  const { isMobile } = Responsive();

  return (
    <CardRoot isMobile={isMobile} {...props}>
      {props.children}
    </CardRoot>
  );
}
