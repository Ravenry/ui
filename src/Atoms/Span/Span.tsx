import React from "react";
import styled, { css } from "styled-components";

import colors, { ColorOptions } from "../utils/colors";
import fonts from "../utils/fonts";

interface SpanStyleProps {
  color?: ColorOptions;
  bold?: boolean;
  background?: ColorOptions;
  clickable?: boolean;
  hoverColor?: ColorOptions;
  underLineOnHover?: boolean;
  textAlign?: string;
  serif?: boolean;
  ellipsis?: boolean;
  size?: string | number;
  lineHeight?: string | number;
  _as?: string;
  onClick?: (e: React.SyntheticEvent) => void;
}

const Root = styled.span<SpanStyleProps>`
  color: ${(props) => (props.color ? colors[props.color] : colors.black100)};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  ${({ background }) =>
    background ? `background-color: ${colors[background]};` : ""}
  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}

  color: ${(props) => (props.color ? colors[props.color] : colors.black100)};
  &:hover {
    color: ${(props) =>
      props.hoverColor
        ? colors[props.hoverColor]
        : props.color !== undefined
        ? colors[props.color]
        : ""};
    ${({ underLineOnHover }) =>
      underLineOnHover ? "text-decoration: underline;" : ""};
  }

  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-family: ${(props) => (props.serif ? fonts.serif : fonts.sansSerif)};

  ${({ ellipsis }) =>
    ellipsis
      ? `text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;`
      : ""}

  ${(props) =>
    props._as === "b1"
      ? css`
          font-size: ${props.size ? props.size : "1rem"};
          line-height: ${props.lineHeight ? props.lineHeight : "1.25rem"};
          letter-spacing: 0.5px;
        `
      : props._as === "b2"
      ? css`
          font-size: ${props.size ? props.size : "0.875rem"};
          line-height: 1.25rem;
          letter-spacing: 0px;
        `
      : props._as === "b3"
      ? css`
          font-size: ${props.size ? props.size : "0.75rem"};
          line-height: 16px;
          letter-spacing: 0.1px;
        `
      : props._as === "s1"
      ? css`
          font-size: ${props.size ? props.size : "0.6875rem"};
          line-height: 18px;
          letter-spacing: 0.2px;
        `
      : props._as === "s2"
      ? css`
          font-size: ${props.size ? props.size : "1.25rem"};
          line-height: 26px;
          letter-spacing: 0.4px;
        `
      : props._as === "s3"
      ? css`
          font-size: ${props.size ? props.size : "1.125rem"};
          line-height: 24px;
          letter-spacing: 0.4px;
        `
      : props._as === "s4"
      ? css`
          font-size: ${props.size ? props.size : "1rem"};
          line-height: 20px;
          letter-spacing: 0.4px;
        `
      : props._as === "s5"
      ? css`
          font-size: ${props.size ? props.size : "0.875rem"};
          line-height: 1.125rem;
          letter-spacing: 0.2px;
        `
      : props._as === "sm1"
      ? css`
          font-size: ${props.size ? props.size : "0.6875rem"};
          line-height: 1.125rem;
          letter-spacing: 0.2px;
        `
      : ""};

  &:hover {
    color: ${(props) =>
      props.hoverColor
        ? colors[props.hoverColor]
        : props.color !== undefined
        ? colors[props.color]
        : ""};
  }
`;

interface SpanProps extends SpanStyleProps {
  children: React.ReactNode;
}

/**
 * Span
 *
 * @param {Object} props - component props
 * @param {ColorOptions} [props.color] - color of the text, default to black100
 * @param {ColorOptions} [props.hoverColor] - color of the hovered text, default to black100
 * @param {Boolean} [props.bold] -
 * @param {String} [props.background] - background color
 * @param {Boolean} [props.clickable] -
 */
export default function Span(props: SpanProps) {
  const { children, color = "black100" } = props;

  return (
    <Root {...props} color={color}>
      {children}
    </Root>
  );
}
