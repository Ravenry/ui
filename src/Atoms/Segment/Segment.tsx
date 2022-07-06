import React from "react";
import styled, { css } from "styled-components";

import colors, { ColorOptions } from "../utils/colors";
import getElevation from "../utils/elevations";

interface Props {
  width?: string;
  padding?: string;
  border?: string;
  clickable?: boolean;
  fluid?: boolean;
  flex?: boolean;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  fontColor?: ColorOptions;
  isText?: boolean;
  color?: ColorOptions;
  textAlign?: string;
  bordered?: boolean;
  margin?: string;
  basic?: boolean;
  borderRadius?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  parentRef?: React.Ref<any>;
  id?: string;
  elevation?: number;
}

/**
 * Segment
 *
 * @param {Object} props - props of the component
 * @param {String} [props.width] - width of the segment
 * @param {String} [props.padding] - custom padding of the segment
 * @param {String} [props.border] - custom border of the segment
 * @param {Boolean} [props.clickable] - flag to tell user that the segment clickable
 * @param {React.CSSProperties} [props.style] -
 */

interface RootProps extends Props {}

const Root = styled.div<RootProps>`
  display: ${({ flex }) => (flex ? "flex" : "block")};
  width: ${({ fluid, width }) => (fluid ? "100%" : width && width)};
  text-align: ${({ textAlign }) => textAlign || "left"};
  ${({ margin }) => (margin ? `margin: ${margin};` : "")}

  ${({ flexDirection }) =>
    flexDirection ? `flex-direction: ${flexDirection}` : ""};
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems}` : "")};
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent}` : ""};
  height: ${({ height }) => height || "auto"};
  color: ${({ fontColor }) => (fontColor ? colors[fontColor] : "inherit")};

  ${(props) =>
    props.bordered
      ? css`
          border: 1px solid ${colors.black10};
          box-shadow: 0;
        `
      : css``}

  ${({ border }) => (border ? `border: ${border};` : "")}
  ${({ clickable, onClick }) =>
    clickable || onClick ? "cursor: pointer;" : ""}

  ${({ basic, elevation }) =>
    basic
      ? css<RootProps>`
          padding: ${({ padding }) => padding || "8px"};
          background-color: ${({ color }) => (color ? colors[color] : "white")};
          ${({ borderRadius }) =>
            borderRadius ? `border-radius: ${borderRadius};` : ""}
        `
      : css<RootProps>`
          background-color: ${({ color }) => (color ? colors[color] : "white")};
          ${({ borderRadius }) =>
            borderRadius ? `border-radius: ${borderRadius};` : ""}
          padding: ${(props) => (props.padding ? props.padding : "24px 40px")};
          ${elevation
            ? getElevation(elevation)
            : "box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1)"};
        `}
`;

export default function Segment({ children, parentRef, ...rest }: Props) {
  return (
    <Root ref={parentRef} {...rest}>
      {children}
    </Root>
  );
}
