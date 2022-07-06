import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";
import Button from "./Button";
import Icon from "../Icon/Icon";

const InternalSpan = styled.span<{ center?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;

  ${({ center }) => (center ? "justify-content: center;" : "")}
`;

const InternalDivider = styled.span<{ disabled?: boolean }>`
  display: flex;
  height: 24px;
  margin-left: 8px;
  margin-right: 8px;
  border-left: 1px solid ${colors.white};

  ${({ disabled }) =>
    disabled
      ? `
        border-left: 1px solid ${colors.black50};
        `
      : ""}
`;

export default function SSOButton(props: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  ssoType: "linkedin" | "google"; // @TODO implement SSO Google
  disabled?: boolean;
  fluid?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const { children, onClick, disabled, fluid, ssoType, type } = props;

  return (
    <Button
      onClick={onClick}
      color="linkedInBlue"
      fluid={fluid}
      disabled={disabled}
      type={type}
    >
      <InternalSpan>
        {ssoType === "linkedin" ? (
          <Icon name="linkedin big" fill={disabled ? "black50" : "white"} />
        ) : null}

        <InternalDivider disabled={disabled} />
        <InternalSpan center>{children}</InternalSpan>
      </InternalSpan>
    </Button>
  );
}
