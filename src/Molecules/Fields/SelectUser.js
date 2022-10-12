import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Spacer, Row, Col, Dropdown, Avatar, Label, Text } from '@ravenry/ui';

import { useOutsideClick } from 'hooks/useOutsideClick';
import { debounce } from 'lodash';
import { Fields } from '..';

const Root = styled(Col)`
  width: 100%;
  flex-direction: ${({ valueOnTop }) => (valueOnTop ? 'column-reverse' : 'column')};
`;

/**
 * Select User
 *
 * @param {Object} props -
 * @param {[]} props.options - list of options
 * @param {Boolean} [props.valueOnTop] - make value on top (default false)
 * @param {React.CSSProperties} [props.rootStyle] - to override container CSS
 * @param {React.CSSProperties} [props.elementStyle] - to override each value CSS
 * @param {String} props.error - error
 * @param {String} props.label - label
 * @param {Object} props.value - value
 * @param {Function} props.onSelect - callback when user select the user
 * @param {Function} props.onChange - callback when user change the input
 */
export default function SelectUser(props) {
  const {
    valueOnTop,
    rootStyle,
    options = [],
    error,
    label,
    value,
    onSelect,
    onChange,
    ...rest
  } = props;

  const [newValue, setNewValue] = React.useState(value ?? '');
  const [dropdown, setDropdown] = React.useState({ open: false });

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setDropdown({ ...dropdown, open: false });
  });

  const onHandleSelect = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    setDropdown({ ...dropdown, open: false });
    if (typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  const onHandleChange = useMemo(() => debounce(onChange, 300), []);
  useEffect(
    () => () => {
      onHandleChange.cancel();
    },
    [],
  );

  return (
    <Root style={rootStyle} valueOnTop={valueOnTop}>
      <div>
        <Label _as="s5" color="black100" bold required>
          {label}
        </Label>

        <Spacer size="8" display="block" />

        <Fields.Text
          {...rest}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value === ',' ? '' : e.target.value);
            onHandleChange(e.target.value === ',' ? '' : e.target.value);
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.keyCode === 188) && newValue !== '') {
              setNewValue('');
            }
          }}
          onMouseUp={() => {
            setDropdown({ ...dropdown, open: true });
          }}
          onBlur={(e) => {
            if (e.target.value !== '') {
              setNewValue('');
            }
          }}
          icon="search"
          data-cy-error={props['data-cy-error']}
          error={error}
        />

        <div ref={ref}>
          {dropdown.open ? (
            <Dropdown
              style={{
                width: '100%',
                top: '8px',
                maxHeight: '224px',
                overflowY: 'auto',
                zIndex: 1,
              }}
              data-cy={props['data-cy-dropdown']}
            >
              {options.map((data, index) => (
                <Dropdown.Item
                  style={{ height: '56px' }}
                  key={`dropdown-${index}`}
                  onClick={(e) => onHandleSelect(e, data)}
                >
                  <Row>
                    <Avatar url={data.avatar} name="Client Name" />
                    <Spacer size="8" display="block" />

                    <Col>
                      <Text _as="s5" textAlign="left" fluid bold>
                        {data.name}
                      </Text>
                      <Text _as="s6" textAlign="left" fluid>
                        {data.email}
                      </Text>
                    </Col>
                  </Row>
                </Dropdown.Item>
              ))}
            </Dropdown>
          ) : null}
        </div>
      </div>
    </Root>
  );
}
