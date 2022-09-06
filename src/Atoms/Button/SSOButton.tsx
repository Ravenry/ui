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
  border-left: 1px solid var(--divider-color);

  ${({ disabled }) =>
    disabled
      ? `
        border-left: 1px solid ${colors.black50};
        `
      : ""}
`;

const SSOButtonStyled = styled(Button)`
  && {
    box-shadow: 0px 0.25px 1px rgba(0, 0, 0, 0.039), 0px 0.85px 3px rgba(0, 0, 0, 0.19);
    color: var(--color);
    background-color: var(--background-color);
    border: var(--border);

    & > span > span > svg > path {
      fill: var(--icon-fill-color) !important;
    }

    & svg {
      fill: var(--icon-fill-color);
    }
  }
`

const STYLES = {
  linkedin: {
    dividerColor: colors.white,
    iconFillColor: colors.white,
    border: 'none',
    backgroundColor: colors.linkedInBlue,
    color: colors.white
  },
  google: {
    dividerColor: colors.black,
    iconFillColor: colors.white,
    border: `1px solid ${colors.black10}`,
    backgroundColor: colors.white,
    color: colors.black
  },
  facebook: {
    dividerColor: colors.black,
    iconFillColor: colors.facebookBlue,
    border: `1px solid ${colors.black10}`,
    backgroundColor: colors.white,
    color: colors.black
  },
};

export default function SSOButton(props: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  ssoType: "linkedin" | "google" | "facebook";
  disabled?: boolean;
  fluid?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const { children, onClick, disabled, fluid, ssoType, type } = props;
  const styles = STYLES[ssoType];

  return (
    <div style={{
        '--divider-color': styles.dividerColor,
        '--icon-fill-color': styles.iconFillColor,
        '--border' : styles.border,
        '--background-color': styles.backgroundColor,
        '--color': styles.color
    } as React.CSSProperties}>
      <SSOButtonStyled
        onClick={onClick}
        fluid={fluid}
        disabled={disabled}
        type={type}
      >
        <InternalSpan>
          <Icon name={`${ssoType}-icon`} />
          <InternalDivider disabled={disabled} />
          <InternalSpan center>{children}</InternalSpan>
        </InternalSpan>
      </SSOButtonStyled>
    </div>
  );
}
