import React from "react";
import styled, { CSSProperties } from "styled-components";

import DropdownItem from "./DropdownItem";

interface RootProps {
  ref?: HTMLDivElement;
  position?: { left: number; top: number };
}

const Root = styled.div<RootProps>`
  ${({ position }) =>
    position
      ? `
      position: absolute;
      top: ${position.top}px;
      left: ${position.left}px;
    `
      : `
    position: relative;
  `}
`;

interface ContainerProps {
  style?: React.CSSProperties | CSSProperties | object;
  width?: string | number;
  /**
   * to help select the element in test
   */
  "data-cy"?: string;
}
const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: white;

  width: ${({ width }) => width || "150px"};

  /* Hover Elevation */

  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
  border-radius: 5px;
`;

interface DropdownProps {
  children: React.ReactNode;
  ref?: (
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
  ) &
    HTMLDivElement;
  style?: React.CSSProperties | CSSProperties | object;
  position?: { left: number; top: number };
  width?: string | number;
  /**
   * to help select the element in test
   */
  "data-cy"?: string;
}

function Dropdown(props: DropdownProps) {
  const { children, ref, style, position, width } = props;

  return (
    <Root ref={ref} position={position}>
      <Container style={style} width={width} data-cy={props["data-cy"]}>
        {children}
      </Container>
    </Root>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;
