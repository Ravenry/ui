import React from "react";
import styled from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

type DividerProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  width?: string;
  offset?: string | number;
  size?: string;
  vertical?: boolean;
  margin?: string | number;
  color?: ColorOptions;

  textOptions?: {
    color?: ColorOptions;
    // must be ended with px
    fontSize?: string;
    // must be ended with px
    lineHeight?: string;
  };
};

const Root = styled.div<DividerStyleProps>`
  display: flex;
  ${({ vertical }) => (vertical ? "flex-direction: column;" : "")}
  align-items: center;
  text-align: center;

  ${({ textOptions }) =>
    textOptions
      ? `
      ${textOptions.fontSize ? `font-size: ${textOptions.fontSize}` : ""};
      ${textOptions.lineHeight ? `line-height: ${textOptions.lineHeight}` : ""};
      ${textOptions.color ? `color: ${colors[textOptions.color]}` : ""};
    `
      : ""}

  ${({ vertical, size }) =>
    vertical
      ? `width: ${size ? `${size}px` : "1px"};`
      : `height: ${size ? `${size}px` : "1px"};`}

  margin: ${(props) => (props.margin ? `${props.margin}px` : "9px 0px")};

  ${({ vertical, offset }) =>
    vertical
      ? `
     margin-top: ${offset && `${-offset}px`};
     margin-bottom: ${offset && `${-offset}px`};`
      : `
     margin-left: ${offset && `${-offset}px`};
     margin-right: ${offset && `${-offset}px`};`}

  ::before,
  ::after {
    content: "";
    flex: 1;
    ${({ vertical, color }) =>
      vertical
        ? `
         height: 50%;
         border-left: ${1}px solid
       ${color ? (colors[color] ? colors[color] : color) : colors.black10};`
        : `border-bottom: ${1}px solid
       ${color ? (colors[color] ? colors[color] : color) : colors.black10};`}
  }

  ::before {
    ${({ vertical, children }) =>
      vertical
        ? `margin-bottom: ${children ? "9px" : 0};`
        : `margin-right: ${children ? "9px" : 0};`}
  }

  ::after {
    ${({ vertical, children }) =>
      vertical
        ? `margin-top: ${children ? "9px" : 0};`
        : `margin-left: ${children ? "9px" : 0};`}
  }
`;

export default function Divider(props: DividerProps) {
  const { children } = props;

  return <Root {...props}>{children}</Root>;
}

type DividerStyleProps = {
  width?: string;
  offset?: string | number;
  size?: string;
  vertical?: boolean;
  margin?: string | number;
  color?: ColorOptions;
  textOptions?: {
    color?: ColorOptions;
    // must be ended with px
    fontSize?: string;
    // must be ended with px
    lineHeight?: string;
  };
};
