import React from 'react';
import styled from 'styled-components';

import { Segment } from '@ravenry/ui';
import getElevation from 'ui/elevations';
import Responsive from 'helper/responsive';

const CardRoot = styled(Segment)`
  margin-bottom: ${({ isMobile, noMargin }) => (isMobile ? '24px' : noMargin ? '0' : '24px')};
  padding: ${({ padding }) => padding || '16px'};
  cursor: pointer;
  display: flex;
  width: ${({ isMobile, width }) => (isMobile ? width : '100%')};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius};` : '')}
  ${({ borderTop }) => (borderTop ? `border-top: ${borderTop};` : '')}
  ${({ shadow }) => (shadow ? `box-shadow: ${shadow};` : getElevation(2))}
  ${({ height }) => (height ? `height: ${height};` : '')}

  ${({ noHover }) =>
    noHover
      ? ''
      : `&:hover {
      ${({ shadowOnHover }) => (shadowOnHover ? `box-shadow: ${shadowOnHover};` : getElevation(4))}
    }`}
`;

export default function Card(props) {
  const { isMobile } = Responsive();

  return <CardRoot isMobile={isMobile} {...props} />;
}
