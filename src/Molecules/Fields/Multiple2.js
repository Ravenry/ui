import React, { useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Icon, Spacer, Text, Tag, Row, Col, Input } from '@ravenry/ui';

import colors from 'ui/colors';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { usePrevState } from 'hooks/usePrevState';
import Dropdown from '../Dropdown/Dropdown';

const Root = styled(Col)`
  width: 100%;
  flex-direction: ${({ valueOnTop }) => (valueOnTop ? 'column-reverse' : 'column')};
`;

const Values = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 16px 10px;
`;

/**
 * Multiple
 *
 * @param {Object} props -
 * @param {string[]} props.value - list of values
 * @param {Boolean} [props.valueOnTop] - make value on top (default false)
 * @param {React.CSSProperties} [props.rootStyle] - to override container CSS
 * @param {React.CSSProperties} [props.elementStyle] - to override each value CSS
 * @param {string} [props.guide]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.editable]
 * @param {Function} [props.onGetValue] - deprecated
 * @param {Function} [props.onValueChange] - improvement of onGetValue
 * @param {string} [props.tagBackground]
 * @param {string|number} [props.tagHeight]
 * @param {string|number} [props.spacing]
 * @param {React.CSSProperties} [props.valueStyle]
 *
 */
export default function Multiple2(props) {
  const {
    value,
    valueOnTop,
    editable,
    rootStyle,
    tagBackground,
    tagHeight,
    withDropdown,
    dropdownOptions = [],
    onValueChange,
    error,
  } = props;

  const [newValue, setNewValue] = React.useState('');
  const [listValue, setListValue] = React.useState(value);
  const [dropdown, setDropdown] = React.useState({ open: false });

  const ref = useRef(null);

  const handleAdd = (e) => {
    const result = listValue.filter((val) => val === e.target.value);
    if (result.length === 0) {
      const newValue = [...listValue, e.target.value];
      setListValue(newValue);

      if (typeof onValueChange === 'function') {
        onValueChange(newValue);
      }
    }
  };

  const handleDelete = (value) => {
    const result = listValue.filter((val) => val !== value);
    setListValue(result);

    if (typeof onValueChange === 'function') {
      onValueChange(result);
    }
  };

  const prevValue = usePrevState(value);

  React.useEffect(() => {
    if (!_.isEqual(value, prevValue)) {
      setListValue(value);
    }
  }, [value, prevValue]);

  React.useEffect(() => {
    if (typeof props.onGetValue === 'function') {
      props.onGetValue(listValue);
    }
  }, [listValue]);

  useOutsideClick(ref, () => {
    setDropdown({ ...dropdown, open: false });
  });

  return (
    <Root style={rootStyle} valueOnTop={valueOnTop}>
      <div>
        {editable && (
          <Input.Text
            {...props}
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value === ',' ? '' : e.target.value);
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.keyCode === 188) && newValue !== '') {
                handleAdd(e);
                setNewValue('');
              }
            }}
            onMouseUp={() => {
              if (withDropdown) {
                setDropdown({ ...dropdown, open: true });
              }
            }}
            onBlur={(e) => {
              if (e.target.value !== '' && !dropdown.open) {
                handleAdd(e);
                setNewValue('');
              }
            }}
            error={error}
          />
        )}

        {error && (
          <>
            <Spacer size="4" display="block" />
            <Text _as="b3" color="red">
              {error}
            </Text>
          </>
        )}

        <div ref={ref}>
          {withDropdown && dropdown.open ? (
            <Dropdown
              style={{
                top: '8px',
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1,
              }}
              items={dropdownOptions
                .filter((option) => option.toLowerCase().includes(newValue.toLowerCase()))
                .map((option) => ({
                  text: option,
                  onClick: () => {
                    setNewValue('');
                    handleAdd({ target: { value: option } });
                    setDropdown({ ...dropdown, open: false });
                  },
                }))}
            />
          ) : null}
        </div>

        <Spacer size="8" display="block" />

        <Text _as="b3" color="black40">
          {props.guide}
        </Text>
      </div>

      <Spacer size="16" display="block" />

      <Values style={props.valueStyle}>
        {listValue &&
          listValue.map((val, i) => (
            <Tag
              key={i}
              editable={editable}
              style={{
                background: colors[tagBackground] || colors.white,
              }}
              height={tagHeight}
              hover
              hoverBorder="blue90"
            >
              <Row alignItems="center" noWrap>
                <Text _as="b3" color="black80" hoverColor="black100" ellipsis>
                  {val}
                </Text>
                {editable && (
                  <>
                    <Spacer size="5" />
                    <Icon
                      name="x"
                      hover
                      hoverFill="blue90"
                      onClick={() => handleDelete(val)}
                      clickable
                    />
                  </>
                )}
              </Row>
            </Tag>
          ))}
      </Values>
    </Root>
  );
}
