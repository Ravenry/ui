import React from "react";
import styled, { css } from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

const Root = styled.a<{
  active?: boolean;
  activeColor?: ColorOptions;
  bold?: boolean;
}>`
  width: 60px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  font-size: 0.5rem;
  line-height: 18px;
  letter-spacing: 0.2px;
  padding-top: 8px;
  ${({ bold }) => (bold ? `font-weight:bold;` : "")}
  ${(props) =>
    props.active
      ? css`
          /* border-bottom: 2px solid ${colors.blue}; */
          color: ${props.activeColor ? props.activeColor : colors.black};
        `
      : css`
          color: ${colors.black40};
        `}

  /* &:hover {
    border-bottom: 2px solid ${colors.blue40};
  } */

  /* padding: 8px 0px; */

  &:hover {
    color: ${colors.black60};
  }
  /* &:not(:last-child) {
    margin-right: 24px;
  } */
`;

interface Props {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  active?: boolean;
  activeColor?: ColorOptions;
  bold?: boolean;
}

export default function NavItemMobile(props: Props) {
  const { children, onClick, active, bold, activeColor } = props;

  return (
    <Root
      onClick={onClick}
      active={active}
      bold={bold}
      activeColor={activeColor}
    >
      {children}
    </Root>
  );
}
