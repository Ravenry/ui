import React from 'react';
import styled from 'styled-components';

import { Divider, Segment, Spacer, Text } from '@ravenry/ui';
import getElevation from 'ui/elevations';

const Root = styled(Segment)`
  ${({ height }) => (height ? `height: ${height};` : '')}
  padding: 8px 16px;
  display: flex;
  ${getElevation(2)};
`;

const StyledSpacer = styled(Spacer)`
  margin-left: 8px;
  margin-right: 8px;
`;

interface ProgressProps {
  // list of progress step
  items: {
    text: string;
    /**
     * to help select the element in test
     */
    'data-cy-item'?: string;
  }[];
  // current progress
  progress: number;
  height?: string;
}

export default function Progress(props: ProgressProps) {
  const { items, progress, height } = props;

  return (
    <Root alignItems="center" height={height}>
      {items.map((item, index, { length }) => (
        <React.Fragment key={`progress-${index}`}>
          <Text
            _as="s6"
            color={progress === length ? 'black' : progress > index ? 'blue' : 'black60'}
            bold={progress > index}
            data-cy={item['data-cy-item']}
          >
            {item.text}
          </Text>
          {index < length - 1 && (
            <StyledSpacer filler>
              <Divider size="2" color={progress - 1 > index ? 'blue' : 'black10'} />
            </StyledSpacer>
          )}
        </React.Fragment>
      ))}
    </Root>
  );
}
