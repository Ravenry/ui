import React, { forwardRef } from "react";
import styled, { CSSProperties } from "styled-components";

import DropdownItem from "./DropdownItem";

interface RootProps {
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
  style?: React.CSSProperties | CSSProperties | object;
  position?: { left: number; top: number };
  width?: string | number;
  /**
   * to help select the element in test
   */
  "data-cy"?: string;
}

interface DropdownComponent extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof DropdownItem;
}


const Dropdown = forwardRef(function Dropdown(props:DropdownProps, ref) {
  const { children, style, position, width } = props;

  return (
    <Root ref={ref} position={position}>
      <Container style={style} width={width} data-cy={props["data-cy"]}>
        {children}
      </Container>
    </Root>
  );
})  as DropdownComponent;

Dropdown.Item = DropdownItem;

export default Dropdown;
