import React from 'react';

import { Dropdown as DropdownAtom } from '@ravenry/ui';

/**
 * Dropdown molecule (not to be confused with DropdownAtom)
 *
 * @param {Object} props -
 * @param {React.CSSProperties} props.style -
 * @param {Object[]} props.items -
 * @param {String} props.items[].text -
 * @param {*} [props.items[].as] - render the item as
 * @param {Function} [props.items[].onClick] - callback
 */
export default function Dropdown(props) {
  const { items, style } = props;

  return (
    <DropdownAtom style={style}>
      {items.map((item, index) => (
        <DropdownAtom.Item key={`dropdown-${index}`} onClick={item.onClick} as={item.as}>
          {item.text}
        </DropdownAtom.Item>
      ))}
    </DropdownAtom>
  );
}
