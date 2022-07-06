import React, { MouseEventHandler } from "react";
import styled from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

type alignItemsType =
  | "stretch"
  | "center"
  | "flex-start"
  | "flex-end"
  | "baseline"
  | "initial"
  | "inherit";

type justifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "initial"
  | "inherit";

interface RowStyleProps {
  noWrap?: boolean;
  padding?: string;
  justifyContent?: justifyContentType;
  alignItems?: alignItemsType;
  clickable?: boolean;
  hoverBackground?: ColorOptions;
  reverse?: boolean;
  width?: string | number;
  height?: string | number;
  gap?: string;
}

const Root = styled.div<RowStyleProps>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  flex-wrap: ${({ noWrap }) => (noWrap ? "nowrap" : "wrap")};
  ${({ padding }) => (padding ? `padding: ${padding};` : "")}
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")}
  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}
  ${({ hoverBackground }) =>
    hoverBackground
      ? `
  &:hover {
    background-color: ${colors[hoverBackground]};
  }`
      : ""}
`;

interface RowProps {
  children?: React.ReactNode;
  alignItems?: alignItemsType;
  justifyContent?: justifyContentType;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  padding?: string;
  reverse?: boolean;
  width?: string | number;
  height?: string | number;
  gap?: string;
  noWrap?: boolean;
}

export default function Row(props: RowProps) {
  const { children = null } = props;

  return <Root {...props}>{children}</Root>;
}
