import React from 'react';

import { Icon, Tooltip } from '../../Atoms';
import { ColorOptions } from '../../shared/colors';


interface IconWithTooltipProps {
  name: string;
  onClick?: () => void;
  position?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left'
    | { top?: string; left?: string; right?: string; bottom?: string };
  arrowPosition?:
    | 'right'
    | 'left'
    | 'top'
    | 'bottom'
    | 'bottom-center'
    | 'bottom center';
  content: string;
  iconStyle?: React.CSSProperties;
  fill?: ColorOptions;
  hoverFill?: ColorOptions;
}

export default function IconWithTooltip(props: IconWithTooltipProps) {
  const { name, position, arrowPosition, content, onClick, iconStyle, fill, hoverFill } = props;

  return (
    <Tooltip position={position} arrowPosition={arrowPosition} content={content}>
      <Icon
        name={name}
        clickable
        hover
        fill={fill}
        hoverFill={hoverFill || 'black'}
        onClick={onClick}
        style={iconStyle}
        data-cy={props['data-cy']}
      />
    </Tooltip>
  );
}
