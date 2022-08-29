import React from 'react';
import styled from 'styled-components';
import { Spacer } from '@ravenry/ui';

import { VNavItem } from 'ui/atoms';
import { amplitudeEvent } from 'helper/amplitude';

interface Props {
  // array of vertical navigation menus
  items: Items[];
  // custom spacer size between each nav item
  spacerSize?: number;
  style?: any;
}

interface Items {
  text: string;
  active: boolean;
  icon?: string;
  to?: string;
  useRawTo?: boolean;
  onClick?: () => void;
  counter?: number;
}

const Root = styled.div``;

export default function VNav({ items = [], spacerSize = 8, style }: Props) {
  return (
    <Root style={style}>
      {items.map((item, index) => (
        <React.Fragment key={`vnav-${index}`}>
          <VNavItem
            to={item.to}
            useRawTo={item.useRawTo}
            onClick={() => {
              amplitudeEvent(`open ${item.text}`);
              item.onClick && item.onClick();
            }}
            icon={item.icon}
            active={item.active}
            counter={item.counter}
            dataCy={`vnav-${item.text}`}
          >
            {item.text}
          </VNavItem>
          {index < items.length - 1 && <Spacer size={spacerSize} display="block" />}
        </React.Fragment>
      ))}
    </Root>
  );
}
