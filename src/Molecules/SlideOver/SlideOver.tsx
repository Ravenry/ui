import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const placements = {
  top: {
    top: 0,
    right: 0,
    left: 0,
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    right: 0,
    bottom: 0,
    left: 0,
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
  },
};

// Styled Components
const DrawerWrapper = styled.div`
  display: block;
  position: absolute;
  width: ${(props) => (props.open ? props.size : '1px')};
  height: ${(props) => (props.open ? props.size : '1px')};
`;

// Covers entire view and is used for dismissal
const DrawerOverlay = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  display: ${(props) => (props.open ? null : 'none')};
  background-color: rgba(231, 234, 240, 0.7);
`;

const DrawerContent = styled.div`
  display: block;
  box-sizing: border-box;
  position: fixed;
  ${(props) => placements[props.position]}
  z-index: 16;
  width: ${(props) => (props.open ? props.size : '1px')};
  overflow-x: hidden;
  overflow-y: scroll;
  color: #000;
  background-color: ${(props) => props.backgroundColor || '#fff'};
  box-shadow: -10px 0px 10px rgba(0, 0, 0, 0.19);
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: all 0.75s ease;
  ${({ padding }) => (padding ? `padding:${padding};` : '')}
`;

export default function SlideOver(props) {
  const { open, size, position, onDismiss, backgroundColor, children, padding } = props;

  useLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <DrawerWrapper open={open} size={size} position={position}>
      <DrawerOverlay open={open} onClick={onDismiss} />
      <DrawerContent
        open={open}
        size={size}
        position={position}
        backgroundColor={backgroundColor}
        padding={padding}
      >
        {children}
      </DrawerContent>
    </DrawerWrapper>
  );
}
