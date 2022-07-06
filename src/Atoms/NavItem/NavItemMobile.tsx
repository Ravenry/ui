import React from "react";
import styled, { css } from "styled-components";

import colors from "../utils/colors";

const Root = styled.a`
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
  ${(props) =>
    props.active
      ? css`
          /* border-bottom: 2px solid ${colors.blue}; */
          color: ${colors.black};
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

/**
 * NavItemMobile
 *
 * @param {Object} props -
 * @param {Function} props.onClick
 * @param {Boolean} props.active
 */
export default function NavItemMobile(props) {
  const { children, onClick, active } = props;

  return (
    <Root onClick={onClick} active={active}>
      {children}
    </Root>
  );
}
