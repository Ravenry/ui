import React from "react";
import styled, { css } from "styled-components";

import colors from "../utils/colors";
import { Icon } from "..";

const styles = {
  enabled: {
    default: css`
      border: 1px solid ${colors.black10};
      color: ${colors.black50};
    `,
    hovered: css`
      border: 1px solid ${colors.blue90};
      color: ${colors.black};

      &:hover span > svg > path {
        fill: ${colors.black};
      }
    `,
  },
  toggled: {
    default: css`
      border: 1px solid ${colors.blue90};
      color: ${colors.blue};
      background-color: ${colors.blue10};
    `,
    hovered: css`
      border: 1px solid ${colors.blue90};
      color: ${colors.blue};
      background-color: ${colors.blue10};
    `,
  },
};

const getStyle = ({
  toggled,
  state,
}: {
  toggled: boolean;
  state: "default" | "hovered";
}) => {
  const variant = toggled ? "toggled" : "enabled";

  return styles[variant][state];
};

const getBorderRadius = (position: "single" | "start" | "middle" | "end") => {
  if (position === "middle") {
    return "0";
  }
  if (position === "start") {
    return "5px 0 0 5px";
  }
  if (position === "end") {
    return "0 5px 5px 0";
  }
  return "5px";
};

const IconContainer = styled.span``;

const ChildrenContainer = styled.span`
  margin-left: 4px;
  margin-right: 8px;
`;

const Root = styled.button<{
  toggled: boolean;
  position: "single" | "start" | "middle" | "end";
  "data-cy"?: string;
}>`
  display: flex;
  justify-content: center;
  height: 32px;
  padding: 6px 8px;
  border-radius: ${({ position }) => getBorderRadius(position)};
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  background-color: ${colors.white};

  ${({ toggled }) => getStyle({ toggled, state: "default" })}

  &:hover {
    ${({ toggled }) => getStyle({ toggled, state: "hovered" })}
  }

  /*&:hover span > svg > path {
    fill: ${colors.black};
  }*/
`;

interface ToggleButtonProps {
  toggled?: boolean;
  position?: "single" | "start" | "middle" | "end";
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  "data-cy"?: string;
}

export default function ToggleButton(props: ToggleButtonProps) {
  const {
    toggled = false,
    position = "single",
    icon,
    children,
    onClick,
  } = props;

  return (
    <Root
      data-cy={props["data-cy"]}
      toggled={toggled}
      onClick={onClick}
      position={position}
    >
      {icon && (
        <IconContainer>
          <Icon name={icon} fill={toggled ? "blue" : undefined} />
        </IconContainer>
      )}
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
    </Root>
  );
}
