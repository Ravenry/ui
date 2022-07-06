import React from "react";
import styled, { css } from "styled-components";

import colors from "../utils/colors";
import Badge from "../Badge/Badge";

const TextContainer = styled.div`
  padding: 3px 4px;
`;

const RootOutlined = styled.div`
  background-color: ${(props) => (props.active ? colors.blue : colors.white)};
  color: ${(props) => (props.active ? colors.white : colors.black40)};
  margin-right: 16px;
  border: 1px solid ${(props) => (props.active ? colors.blue : colors.black10)};
  border-radius: 5px;
  height: 32px;
  line-height: 2rem;
  padding: 0px 16px;
  text-align: center;
  position: relative;
  cursor: pointer;
`;

const MobileBadge = styled(Badge)`
  top: -8px;
  right: -8px;
  position: absolute;
`;

const Root = styled.a.withConfig({
  // add props to the array to prevent them passed to the element
  // active & width are prevented to remove warning in developer console
  // since those are used only for styled-components styling condition
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["active", "width"].includes(prop) && defaultValidatorFn(prop),
})`
  ${(props) =>
    props.outlined
      ? css`
          background-color: ${(props) =>
            props.isActive ? colors.blue : colors.white};
          color: ${(props) => (props.isActive ? colors.white : colors.black40)};
          margin-right: 16px;
          border: 1px solid
            ${(props) => (props.isActive ? colors.blue : colors.black10)};
          border-radius: 5px;
          height: 32px;
          line-height: 2rem;
          padding: 0px 16px;
          text-align: center;
        `
      : css`
          /* width: ${(props) => (props.width ? props.width : "150px")}; */
          display: inline-flex;
          cursor: pointer;
          text-decoration: none;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0.5px;
          font-weight: bold;

          ${(props) =>
            props.active
              ? css`
                  border-bottom: 2px solid ${colors.blue};
                  color: ${colors.blue};
                `
              : css`
                  color: ${colors.black60};
                  border-bottom: 2px solid transparent;
                `}

          padding-bottom: 12px;

          ${({ center }) =>
            center
              ? `
            padding-left: 16px;
            padding-right: 16px;
          `
              : ""}

          &:hover {
            ${({ active }) =>
              active ? `border-bottom: 2px solid ${colors.blue90};` : ""}
          }

          &:hover > div:first-of-type {
            color: ${({ active }) => (active ? colors.blue90 : colors.black)};
          }

          &:focus {
            color: ${colors.black60};
            text-decoration: none;
          }

          &:not(:last-child) {
            margin-right: 24px;
          }
        `}
`;

/**
 * NavItem
 *
 * @param {Object} props -
 * @param {Function} props.onClick
 * @param {Boolean} props.active
 */
export default function NavItem(props) {
  const { children, onClick, active, width, outlined, ref, id, center, style } =
    props;

  return outlined ? (
    <RootOutlined
      onClick={onClick}
      active={active}
      width={width}
      as={props.as}
      to={props.to}
      ref={ref}
      id={id}
    >
      {props.width}
      {children}
      <MobileBadge isHidden={!props.notif}>{props.notif}</MobileBadge>
    </RootOutlined>
  ) : (
    <Root
      onClick={onClick}
      active={active}
      width={width}
      as={props.as}
      to={props.to}
      ref={ref}
      id={id}
      center={center}
      style={style}
    >
      {props.width}
      <TextContainer>{children}</TextContainer>
      {!center && (
        <Badge
          style={{
            marginLeft: "8px",
            marginRight: "2px",
            marginTop: "2px",
            fontSize: "12px",
          }}
          isHidden={!props.notif}
          square
        >
          {props.notif > 99 ? "99+" : props.notif}
        </Badge>
      )}
    </Root>
  );
}
