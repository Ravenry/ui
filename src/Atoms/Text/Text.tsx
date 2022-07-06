import React from "react";
import styled, { css } from "styled-components";

import responsive from "../utils/responsive";
import colors, { ColorOptions } from "../utils/colors";
import fonts from "../utils/fonts";

export interface PropsText {
  _as:
    | "b1"
    | "b2"
    | "b3"
    | "s1"
    | "s2"
    | "s3"
    | "s4"
    | "s5"
    | "s6"
    | "h4"
    | "h5"
    | "h6"
    | "n1"
    | "btn1"
    | "btn2"
    | "btn3"
    | "sm2"
    | "brd"
    | "pld1";
  isMobile?: boolean;
  color?: ColorOptions;
  hoverColor?: ColorOptions;
  bold?: boolean;
  bolder?: boolean;
  inline?: boolean;
  fluid?: boolean;
  width?: number | string;
  flex?: boolean;
  ellipsis?: boolean;
  slashes?: boolean;
  clickable?: boolean;
  size?: string;
  serif?: boolean;
  suffix?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  letterSpacing?: string;
  isHtml?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  style?: React.CSSProperties;
  underLineOnHover?: boolean;
  uppercase?: boolean;
  dangerouslySetInnerHTML?: any;
  noWrap?: boolean;
}

interface RootProps extends PropsText {}

const types = (
  size?: string,
  lineHeight?: string,
  letterSpacing?: string,
  bold?: boolean,
  bolder?: boolean
) => ({
  b1: css`
    font-size: ${size || "1rem"};
    line-height: ${lineHeight || "1.25rem"};
    letter-spacing: ${letterSpacing || "0.5px"};
  `,
  b2: css`
    font-size: ${size || "0.875rem"};
    line-height: 1.25rem;
    letter-spacing: 0px;
  `,
  b3: css`
    font-size: ${size || "0.75rem"};
    line-height: 1rem;
    letter-spacing: 0.1px;
  `,
  s1: css`
    font-size: ${size || "1.5rem"};
    line-height: 2rem;
    letter-spacing: 0.2px;
  `,
  s2: css`
    font-size: ${size || "1.25rem"};
    line-height: 1.625rem;
    letter-spacing: 0.5px;
  `,
  s3: css`
    font-size: ${size || "1.125rem"};
    line-height: 1.5rem;
    letter-spacing: 0.5px;
  `,
  s4: css`
    font-size: ${size || "1rem"};
    line-height: 1.25rem;
    letter-spacing: 0.3px;
  `,
  s5: css`
    font-size: ${size || "0.875rem"};
    line-height: 1.125rem;
    letter-spacing: 0.2px;
  `,
  s6: css`
    font-size: ${size || "0.75rem"};
    line-height: ${lineHeight || "0.875rem"};
    letter-spacing: 0px;
  `,
  n1: css`
    font-size: ${size || "0.75rem"};
    line-height: 0.75rem;
    letter-spacing: 0.1px;
  `,
  btn1: css`
    font-size: ${size || "0.875rem"};
    line-height: 1.125rem;
    letter-spacing: ${bold ? "0.5px" : "0.2px"};
  `,
  btn2: css`
    font-size: ${size || "0.75rem"};
    line-height: 0.875rem;
    letter-spacing: 0.1px;
  `,
  btn3: css`
    font-size: ${size || "10px"};
    line-height: 12px;
    letter-spacing: 0.3px;
  `,
  h3: css`
    font-size: ${size || "2.5rem"};
    line-height: ${lineHeight || "3rem"};
    letter-spacing: ${letterSpacing || "0px"};
  `,
  h4: css`
    font-size: ${size || "2.25rem"};
    line-height: ${lineHeight || "2.5rem"};
    letter-spacing: ${letterSpacing || "0px"};
  `,
  h5: css`
    font-size: 2rem;
    line-height: 2.25rem;
    letter-spacing: 0px;
  `,
  h6: css`
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: 0px;
  `,
  sm2: css`
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.4px;
  `,
  brd: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
  `,
  pld1: css`
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
  `,
});

const DefaultRoot = styled.p<RootProps>`
  overflow-wrap: ${({ noWrap }) => (noWrap ? "normal " : "break-word")};
  color: ${({ color }) => (color ? colors[color] : colors.black100)};
  &:hover {
    color: ${({ color, hoverColor }) =>
      hoverColor
        ? colors[hoverColor]
        : color
        ? colors[color]
        : colors.black100};
    ${({ underLineOnHover }) =>
      underLineOnHover ? "text-decoration: underline;" : ""};
  }

  display: ${({ inline }) => (inline ? "inline" : "block")};
  font-weight: ${({ bold, bolder }) =>
    bold ? "bold" : bolder ? "900" : "normal"};
  width: ${({ fluid, width }) => (fluid ? "100%" : width || "fit-content")};
  text-align: ${({ textAlign }) => textAlign || "left"};
  font-family: ${({ serif }) => (serif ? fonts.serif : fonts.sansSerif)};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};

  white-space: ${({ noWrap }) => (noWrap ? "no-wrap" : "pre-wrap")};

  ${({ ellipsis }) =>
    ellipsis
      ? `text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;`
      : ""}
  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}

  ${({ _as, size, lineHeight, letterSpacing, bold }) =>
    types(size, lineHeight, letterSpacing, bold)[_as]};
`;

const HeaderRoot = styled.div<RootProps>`
  color: ${(props) => (props.color ? colors[props.color] : colors.black100)};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  max-width: ${(props) => (props.isMobile ? "100%" : "calc(100vw - 400px)")};

  width: ${(props) =>
    props.fluid ? "100%" : props.width ? props.width : "fit-content"};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-family: ${(props) => (props.serif ? fonts.serif : fonts.sansSerif)};
  display: ${(props) => (props.flex ? "flex" : "block")};
  align-items: flex-end;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  ${(props) =>
    types(props.size, props.lineHeight, props.letterSpacing, props.bold)[
      props._as
    ]};
`;

interface SuffixStyleProps {
  _as?: "b1" | "b2" | "b3";
  children?: React.ReactNode;
}

const Suffix = styled(DefaultRoot)<SuffixStyleProps>`
  font-size: 0.75rem;
  height: 18px;
  color: ${colors.black40};
  margin-left: 16px;
`;

/**
 * Text
 *
 * @param {Object} props - component props
 * @param {"b1" | "b2" | "b3" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "h4" | "h5" | "h6" | "n1" | "btn1" | "btn2" | 'btn3'} [props._as] - render the component _as
 * @param {String} [props.color] - component color
 * @param {"left" | "center" | "right"} [props.textAlign] -
 * @param {Boolean} [props.bold] -
 * @param {String} [props.size] - size in pixels, e.g. 12px
 * @param {String} [props.lineHeight] - line heigth in pixels, e.g. 0.875rem
 * @param {Boolean} [props.inline] - true if the desired text to be inline
 * @param {Boolean} [props.ellipsis] - flag to make the overflow text ellipsis
 * @param {Boolean} [props.clickable] - flag to make the text clickable
 * @param {Function} [props.onClick] - callback when the element is clicked
 * @param {Boolean} [props.uppercase] - flag to make the text uppercase
 * @param {*} children - children components
 */
export default function Text({
  isHtml,
  children,
  slashes,
  ...rest
}: PropsText) {
  const { isMobile } = responsive();

  if (rest._as.includes("h")) {
    return (
      <HeaderRoot {...{ ...rest, _as: rest._as || "h4" }} isMobile={isMobile}>
        {children}
        {rest.suffix ? <Suffix _as="b3">{rest.suffix}</Suffix> : null}
      </HeaderRoot>
    );
  }
  return slashes ? (
    <DefaultRoot {...rest}>
      {typeof children === "string" ? children.replace(/,/g, "/") : children}
    </DefaultRoot>
  ) : isHtml ? (
    <DefaultRoot
      {...rest}
      dangerouslySetInnerHTML={{ __html: `${children}` }}
    />
  ) : (
    <DefaultRoot {...rest}>{children}</DefaultRoot>
  );
}

Text.defaultProps = {
  _as: "b1",
  bold: false,
  color: "black100",
};
