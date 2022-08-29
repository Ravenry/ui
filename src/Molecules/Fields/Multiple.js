import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon, Spacer, Text, Tag, Row, Col, Container, Input } from '@ravenry/ui';

import colors from 'ui/colors';
import { useOutsideClick } from 'hooks/useOutsideClick';
import Dropdown from '../Dropdown/Dropdown';

const Root = styled(Col)`
  width: 100%;
  flex-direction: ${({ valueOnTop }) => (valueOnTop ? 'column-reverse' : 'column')};
`;

const Values = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const Suggestions = styled.div``;

const CustomizedTag = styled(Tag)`
  &:hover {
    border: 1px solid ${colors.blue90};
  }
  &:hover > div > p {
    color: ${colors.black100};
  }
  &:hover > div > svg > path {
    fill: ${colors.blue90};
  }
`;

/**
 * Multiple
 *
 * @param {Object} props -
 * @param {[]} props.value - list of values
 * @param {Boolean} [props.valueOnTop] - make value on top (default false)
 * @param {React.CSSProperties} [props.rootStyle] - to override container CSS
 * @param {React.CSSProperties} [props.elementStyle] - to override each value CSS
 */
export default function Multiple(props) {
  const {
    value,
    valueOnTop,
    editable,
    rootStyle,
    tagBackground,
    tagHeight,
    withDropdown,
    dropdownOptions = [],
    tagMargin,
    suggestions = [],
    error,
  } = props;

  const [newValue, setNewValue] = React.useState('');
  const [listValue, setListValue] = React.useState(value);
  const [dropdown, setDropdown] = React.useState({ open: false });

  const ref = useRef(null);

  const handleAdd = (e) => {
    const result = listValue.filter((val) => val === e.target.value);
    if (result.length === 0) {
      setListValue([...listValue, e.target.value]);
    }
  };

  const handleDelete = (value) => {
    const result = listValue.filter((val) => val !== value);
    setListValue(result);
  };

  React.useEffect(() => {
    setListValue(value);
  }, [value]);

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
      {valueOnTop && suggestions.length > 0 && (
        <Suggestions>
          <Spacer size="8" display="block" />
          <Text _as="s6" color="black80">
            Suggestions:
          </Text>
          <Spacer size="16" display="block" />
          {suggestions
            // .filter((item) => !listValue.includes(item.text))
            .map((item, index) => {
              return (
                <Container flex justifyContent="flex-start" key={index}>
                  <CustomizedTag
                    backgroundColor="backgroundWhite"
                    clickable
                    onClick={() => handleAdd({ target: { value: item.text } })}
                    style={{
                      margin: tagMargin || '0 16px 16px 0',
                    }}
                    height={tagHeight}
                    padding="6px 24px 6px 16px"
                  >
                    <Row alignItems="center" noWrap>
                      <Icon name="plus" fill="blue100" />
                      <Spacer size="4" />
                      <Text _as="btn1" bold color="black60" ellipsis>
                        {item.text}
                      </Text>
                    </Row>
                  </CustomizedTag>
                </Container>
              );
            })}
        </Suggestions>
      )}
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
              if (e.target.value !== '') {
                handleAdd(e);
                setNewValue('');
              }
            }}
            error={error}
          />
        )}
        {error ? (
          <>
            <Spacer size="4" display="block" />
            <Text _as="b3" color="red">
              {error}
            </Text>
          </>
        ) : null}

        {error && (
          <>
            <Spacer size="4" display="block" />
            <Text _as="b3" color="red">
              {error}
            </Text>
          </>
        )}

        <div ref={ref}>
          {withDropdown && dropdown.open && (
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
          )}
        </div>
        <Text _as="b3" color="black40">
          {props.guide}
        </Text>
      </div>

      <Spacer size="8" display="block" />

      <Values>
        {listValue &&
          listValue.map((val, i) => (
            <CustomizedTag
              key={i}
              editable={editable}
              style={{
                background: colors[tagBackground] || colors.white,
                margin: tagMargin || '0 16px 16px 0',
              }}
              height={tagHeight}
              padding="6px 16px 6px 24px"
            >
              <Row alignItems="center" noWrap>
                <Text _as="btn1" bold color="black60" ellipsis>
                  {val}
                </Text>{' '}
                {editable && (
                  <>
                    <Spacer size="4" />
                    <Icon name="x" onClick={() => handleDelete(val)} clickable />
                  </>
                )}
              </Row>
            </CustomizedTag>
          ))}
      </Values>
    </Root>
  );
}
