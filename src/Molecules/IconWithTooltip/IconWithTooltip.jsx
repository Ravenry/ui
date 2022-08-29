import React from 'react';

import { Icon, Tooltip } from '@ravenry/ui';

/**
 * IconWithTooltip
 *
 * @param {Object} props
 * @param {String} props.name - icon name
 * @param {(e: React.SyntheticEvent) => void} [props.onClick] - callback when clicked
 * @param {String} props.content - tooltip content
 * @param {String | {top:String, right: String}
 *          | {top:String, left: String}} props.position - tooltip position
 * @param {String} [props.arrowPosition] - tooltip arrow position
 * @param {string} [props.fill] - icon fill
 * @param {string} [props.hoverFill] - icon fill
 */
export default function IconWithTooltip(props) {
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
