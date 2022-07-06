import React from "react";
import styled from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

interface SpacerStyleProps {
  size?: number | string;
  horizontal?: boolean;
  display?: "block" | string;
  color?: ColorOptions;
  filler?: boolean;
}

const Root = styled.div<SpacerStyleProps>`
  width: ${(props) => props.size && `${props.size}px`};
  height: ${(props) => props.size && !props.horizontal && `${props.size}px`};
  display: ${({ display }) => display || "inline-block"};
  background-color: ${(props) => props.color && colors[props.color]};
  flex-grow: ${(props) => props.filler && 1};
`;

interface SpacerProps {
  children?: React.ReactNode;
  size?: number | string;
  display?: "block" | string;
  horizontal?: boolean;
  filler?: boolean;
}

/**
 * Spacer
 *
 * @param {Object} props - component props
 * @param {String | Number} props.size - space in numeric (without "px")
 * @param {Boolean} [props.horizontal] - specify the space to be only horizontal
 * @param {"block"} [props.display] - used to make sure the spacer displayed as block
 * @param {*} [props.filler] -
 */
export default function Spacer(props: SpacerProps) {
  const { children = null } = props;

  return <Root {...props}>{children}</Root>;
}
