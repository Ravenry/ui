import React from "react";
import styled from "styled-components";

import { media } from "../utils/devices";
import colors, { ColorOptions } from "../utils/colors";

interface ColProps {
  children?: React.ReactNode;
  justifyContent?:
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "center"
    | "left"
    | "right"
    | "normal"
    | "baseline"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "stretch";
  alignItems?: string;
  grow?: boolean;
  style?: React.CSSProperties;
  width?: string | number;
  padding?: number | string;
  margin?: number | string;
  gap?: number | string;
}

interface ColStyleProps {
  width?: string | number;
  noWrap?: boolean;
  shrink?: boolean;
  ratio?: number;
  justifyContent?:
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "center"
    | "left"
    | "right"
    | "normal"
    | "baseline"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "stretch";
  alignItems?: string;
  grow?: boolean;
  color?: ColorOptions;
  clickable?: boolean;
  margin?: number | string;
  padding?: number | string;
  gap?: number | string;
  mediaQuery?: string;
}

const Root = styled.div<ColStyleProps>`
  width: ${({ width }) => width || "auto"};
  display: flex;
  flex-direction: column;
  flex-wrap: ${({ noWrap }) => (noWrap ? "nowrap" : "wrap")};
  ${({ shrink }) => (shrink ? `flex-shrink: ${shrink};` : "")}
  ${({ ratio }) => (ratio ? `flex: ${ratio};` : "")}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")}
  ${({ grow }) => (grow ? "flex-grow: 1;" : "")}
  ${({ color }) => (color ? `background-color: ${colors[color]};` : "")}

  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}
  ${({ margin }) => (margin ? `margin: ${margin};` : "")}
  ${({ padding }) => (padding ? `padding: ${padding};` : "")}
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}

  ${({ mediaQuery }) => media(mediaQuery)}
`;

/**
 * Col
 *
 * @param {Object} props - component props
 * @param {Number} [props.ratio] - width ratio of the column
 * @param {String} [props.spacing] - margin spacing
 * @param {String} [props.width] - width
 * @param {String} [props.justifyContent] -
 * @param {String} [props.alignItems] -
 * @param {Boolean} [props.grow] -
 * @param {String} [props.color] - custom background color
 * @param {Function} [props.onClick] - callback on click
 * @param {Boolean} [props.clickable] - make pointer cursor
 */
export default function Col(props: ColProps) {
  const { children } = props;

  return <Root {...props}>{children}</Root>;
}
