import React from "react";
import styled from "styled-components";
import colors, { ColorOptions } from "../utils/colors";

interface RootProps {
  hoverBackground?: ColorOptions;
  onClick: (e: React.SyntheticEvent) => void;
  as?: string;
}

const Root = styled.div<RootProps>`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 12px 16px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 20px;
  color: ${colors.black50};

  &:hover {
    background-color: ${({ hoverBackground }) =>
      hoverBackground ? colors[hoverBackground] : colors.black5};
    color: ${colors.black100};
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

interface DropdownItemProps extends RootProps {
  children: React.ReactNode | JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  /**
   * to help select the element in test
   */
  "data-cy"?: string;
}

export default function DropdownItem(props: DropdownItemProps) {
  const { children, hoverBackground, onClick, style } = props;

  return (
    <Root
      hoverBackground={hoverBackground}
      onClick={onClick}
      style={style}
      data-cy={props["data-cy"]}
    >
      {children}
    </Root>
  );
}
