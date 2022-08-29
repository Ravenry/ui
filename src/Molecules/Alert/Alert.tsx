import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Icon, Row, Spacer } from '@ravenry/ui';
import colors, { ColorOptions } from 'ui/colors';

const Root = styled.div`
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: fit-content;
  background-color: transparent;
`;

interface StyledContent {
  color: ColorOptions;
  stopDuration: number;
}

const animation = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  15%, 85% {
    transform: translate(0, 100px);
  }
`;

const Content = styled(Row)<StyledContent>`
  margin: -80px auto;
  padding: 16px;
  width: fit-content;

  background: ${colors.white};

  border: 2px solid ${({ color }) => colors[color]};

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  animation: ${animation} ${({ stopDuration }) => stopDuration}s linear 1;
`;

interface Props {
  children?: React.ReactNode;
  success?: boolean;
  danger?: boolean;
  open: boolean;
  onFinish: () => void;
  /** stop duration in seconds */
  stopDuration?: number;
  icon?: string;
  iconFill?: ColorOptions;
}

export default function Alert(props: Props) {
  const { children, success, danger, open, onFinish, stopDuration = 5, icon, iconFill } = props;

  const color = success ? 'green' : danger ? 'red' : 'black';

  useEffect(() => {
    const timer = setTimeout(onFinish, stopDuration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return open ? (
    <Root>
      <Content alignItems="center" color={color} stopDuration={stopDuration}>
        {icon ? (
          <>
            <Icon name={icon} fill={iconFill || color} />
            <Spacer size="16" />
          </>
        ) : null}
        {children}
      </Content>
    </Root>
  ) : null;
}
