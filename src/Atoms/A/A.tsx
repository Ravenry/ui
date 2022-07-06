import React from "react";
import styled from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

/**
 * A
 *
 * @param {Object} props - component props
 * @param {String} props.href - the link
 * @param {String} [props.color] - component color
 * @param {Boolean} [props.bold] -
 * @param {Boolean} [props.inline] - true if the desired text to be inline
 * @param {Boolean} [props.newTab] - true if the link to be opened in a new tab
 */

const Root = styled.a<AStyleProps>`
  text-decoration: none;
  color: ${(props) => (props.color ? colors[props.color] : colors.blue)};
  display: ${({ inline }) => (inline ? "inline" : "block")};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  cursor: pointer;

  :hover {
    color: ${({ hoverColor, color }) =>
      hoverColor ? colors[hoverColor] : color ? colors[color] : colors.blue};
    ${({ underLineOnHover }) =>
      underLineOnHover ? "text-decoration: underline;" : ""};
  }
  :focus {
    color: ${({ focusColor, color }) =>
      focusColor ? colors[focusColor] : color ? colors[color] : colors.blue};
    text-decoration: none;
  }
`;

export default function A(props: any) {
  const { children, newTab } = props;

  const newTabProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Root {...props} {...newTabProps}>
      {children}
    </Root>
  );
}

interface AStyleProps {
  readonly inline: boolean;
  color: ColorOptions;
  bold: boolean;
  hoverColor: ColorOptions;
  focusColor: ColorOptions;
  underLineOnHover?: boolean;
}
