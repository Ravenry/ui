import * as React from "react";
import styled from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

type justifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit";

interface ContainerStyleProps {
  flex?: boolean;
  fluid?: boolean;
  width?: number | string;
  height?: number | string;
  textAlign?: "left" | "center" | "right" | "justify";
  color?: ColorOptions;
  hoverColor?: ColorOptions;
  borderRadius?: string | number;
  padding?: string | number;
  gap?: string;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  alignItems?:
    | "normal"
    | "flex-start"
    | "flex-end"
    | "center"
    | "start"
    | "end"
    | "self-start"
    | "self-end"
    | "baseline"
    | "stretch";
  justifyContent?: justifyContentType;
  justify?: boolean;
  start?: boolean;
  end?: boolean;
  wrap?: boolean;
}

const Root = styled.div<ContainerStyleProps>`
  display: ${(props) => (props.flex ? "flex" : "block")};
  width: ${(props) =>
    props.fluid ? "100%" : props.width ? props.width : "fit-content"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  background-color: ${(props) => props.color && colors[props.color]};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  flex-direction: ${(props) => (props.row ? "row" : props.column && "column")};
  align-items: ${(props) =>
    props.center
      ? "center"
      : props.alignItems
      ? props.alignItems
      : "flex-start"};
  justify-content: ${(props) => props.justify && "space-between"};
  justify-content: ${(props) => props.start && "flex-start"};
  justify-content: ${(props) => props.end && "flex-end"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  ${({ wrap }) => (wrap ? "flex-wrap: wrap;" : "")}
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}
  ${({ flex, height }) => (flex ? "" : `height: ${height || "100%"};`)}
  ${({ height }) => (height ? `height: ${height};` : "")}

  &:hover {
    ${({ hoverColor }) =>
      hoverColor
        ? `background-color: ${colors[hoverColor || "backgroundWhite"]}`
        : ""}
  }
`;

interface ContainerProps {
  children?: React.ReactNode;
  flex?: boolean;
  fluid?: boolean;
  width?: number | string;
  height?: number | string;
  textAlign?: "left" | "center" | "right" | "justify";
  color?: ColorOptions;
  hoverColor?: ColorOptions;
  borderRadius?: string | number;
  padding?: string | number;
  gap?: string;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  alignItems?:
    | "normal"
    | "flex-start"
    | "flex-end"
    | "center"
    | "start"
    | "end"
    | "self-start"
    | "self-end"
    | "baseline"
    | "stretch";
  justifyContent?: justifyContentType;
  justify?: boolean;
  start?: boolean;
  end?: boolean;
  wrap?: boolean;
  onClick?: React.MouseEventHandler;
}

/**
 * Container
 *
 * @param {Object} props -
 * @param {Boolean} [props.fluid] - 100% parent width if true
 * @param {String} [props.width] - custom width
 * @param {String} [props.height] - custom height
 * @param {Boolean} [props.flex] - render the component to display as flex
 * @param {Boolean} [props.row] - make the flex direction row
 * @param {Boolean} [props.column] - make the flex direction column
 * @param {String} [props.color] - custom background color
 * @param {String} [props.padding] - custom padding
 */
export default function Container(props: ContainerProps) {
  const { children } = props;

  return <Root {...props}>{children}</Root>;
}
