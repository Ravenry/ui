import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const Root = styled.div`
  display: flex;
  ${({ column }) => (column ? "flex-direction: column;" : "")}
  align-items: center;
  justify-content: space-between;
  flex-shrink: 1;
  width: 100%;
  height: ${({ height }) => height || "auto"};
`;

/**
 * Toolbar
 * @param {*} props
 * @param {boolean} [props.column]
 *
 */
function Toolbar(props) {
  return <Root {...props}>{props.children}</Root>;
}

const Group = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

const Spacer = styled.div`
  display: block;
  height: 100%;
  width: 16px;
  flex-grow: ${(props) => props.fluid && "1"};
`;

const Item = styled.div`
  padding: 0px 8px 0px 8px;
  &:first-child {
    padding: 0px 8px 0px 16px;
  }
  &:last-child {
    padding: 0px 16px 0px 8px;
  }
`;

const Divider = styled.div`
  display: block;
  height: 100%;
  width: 1px;
  margin: 8px;
  background-color: ${colors.black5};
`;

/**
 * @typedef {{
 *   wrap?: boolean;
 * }} ToolbarLeftProps
 * */

/* eslint operator-linebreak: ["off"] */
const Left =
  /** @type {import('styled-components').ThemedStyledFunction<'div', ToolbarLeftProps} */
  styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 1;
    width: 100%;
    ${({ wrap }) => (wrap ? "flex-wrap: wrap" : "")}
  `;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 1;
  width: 100%;
`;

Toolbar.Divider = Divider;
Toolbar.Left = Left;
Toolbar.Right = Right;
Toolbar.Group = Group;
Toolbar.Item = Item;
Toolbar.Spacer = Spacer;

export default Toolbar;
