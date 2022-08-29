import React from 'react';
import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import { useField, useFormikContext } from 'formik';
import { Label, Text, Row, Spacer } from '@ravenry/ui';

import colors from '../../utils/colors';

const customStyles = ({ height, borderRadius, optionPaddingTop } = {}) => {
  return {
    control: (styles, { selectProps }) => ({
      ...styles,
      minHeight: '32px',
      height: height || '32px',
      borderRadius: borderRadius || '5px',
      margin: 0,
      fontWeight: 'normal',
      border: `${selectProps.isFilter ? '0px' : '1px'} solid ${
        selectProps.error ? colors.red : selectProps.isDisabled ? colors.black50 : colors.black10
      }`,
      boxShadow: `${selectProps.isFilter ? '0px 2px 3px rgba(0, 0, 0, 0.1)' : 'none'} `,
      backgroundColor: `${selectProps.isDisabled ? colors.black10 : '#ffffff'}`,
      color: `${colors.red}`,

      ':hover': {
        ...styles[':hover'],
        border: `${selectProps.isFilter ? '0px' : '1px'} solid ${
          selectProps.error ? colors.red : colors.blue90
        } !important`,
        // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      },
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      padding: '0px 16px',
    }),
    singleValue: (styles, { selectProps }) => ({
      ...styles,
      color: selectProps.isDisabled ? colors.black50 : colors.black,
    }),
    dropdownIndicator: (styles, { selectProps }) => ({
      ...styles,
      color: selectProps.isDisabled ? colors.black100 : colors.black40,
      height: '32px',
      padding: '6px',
    }),
    menu: (styles) => ({ ...styles, borderRadius: borderRadius || '5px' }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: '230px',
      paddingTop: 0,
      paddingBottom: 0,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      paddingLeft: 16,
      paddingTop: optionPaddingTop,
      height: height || '32px',
      borderRadius: borderRadius || '5px',
      backgroundColor: isDisabled
        ? colors.black5
        : isSelected
        ? colors.blue
        : isFocused
        ? colors.black5
        : '#ffffff',
      color: isDisabled ? colors.black100 : isSelected ? colors.white : colors.black50,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: !isSelected && colors.black5,
        color: !isSelected && colors.black,
      },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    placeholder: (styles, { selectProps }) => ({
      ...styles,
      color: selectProps.error ? colors.red : colors.grey,
      margin: 0,
    }),
  };
};

function BaseSelect(props: any) {
  const {
    disabled,
    isFilter,
    options,
    value,
    error,
    placeholder,
    onChange,
    onClear,
    onFocus,
    style,
    controlShouldRenderValue = true,
    dataCy,
    dropdownCustomStyle,
    isSearchable = true,
  } = props;

  return (
    <div style={style} data-cy={dataCy}>
      <ReactSelect
        isDisabled={disabled}
        isFilter={isFilter}
        isSearchable={isSearchable}
        styles={customStyles(dropdownCustomStyle)}
        options={options}
        value={value}
        error={error}
        onChange={onChange}
        onFocus={onFocus}
        onClear={onClear}
        placeholder={placeholder}
        controlShouldRenderValue={controlShouldRenderValue}
      />
    </div>
  );
}

const Container = styled.div`
  /* width: ${(props) => props.width && props.width}; */
  width: 100%;
  padding: 0;
  position: relative;
  ${(props) =>
    props.inline
      ? css`
          display: flex;
          align-items: center;
        `
      : css``};
`;

/**
 * Select molecule
 *
 * @param {Object} props
 */
const SelectWithFormikHooks = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, submitForm } = useFormikContext();
  const def = props.options.filter((op) => op.value === field.value);

  return (
    <Container {...props} inline={props.inline} style={props.style} id={props.id}>
      {label && (
        <>
          <Row>
            <Label
              inline={props.inline}
              color={props.labelColor}
              _as={props._labelAs}
              bold
              required={props.required}
            >
              {label}
            </Label>
          </Row>
          <Spacer size="8" display="block" />
        </>
      )}
      <div
        data-cy={props.dataCy}
        style={{ width: props.width ? props.width : 200, position: 'relative' }}
      >
        <BaseSelect
          disabled={props.disabled}
          isFilter={props.isFilter}
          options={props.options}
          value={(def && def[0]) || ''}
          error={props.error || (meta.touched && meta.error)}
          onChange={(e) => {
            if (e) {
              setFieldValue(props.name, e.value);

              if (typeof props.onChange === 'function') {
                props.onChange(e);
              }
            }

            if (typeof props.onChange === 'function') {
              props.onChange(e);
            }

            if (props.submitOnChange) {
              submitForm();
            }
          }}
          onClear={(e) => {
            if (e) {
              setFieldValue(props.name, '');
            }

            if (props.submitOnChange) {
              submitForm();
            }
          }}
          onFocus={props.onFocus}
          placeholder={props.placeholder}
          controlShouldRenderValue={props.controlShouldRenderValue}
        />
        {props.error || (meta.touched && meta.error) ? (
          <>
            <Spacer size="4" display="block" />
            <Text _as="b3" color="red">
              {props.error || meta.error}
            </Text>
          </>
        ) : null}
      </div>
    </Container>
  );
};

const SelectWithoutFormikHooks = ({ label, ...props }) => {
  return (
    <Container {...props} inline={props.inline} style={props.style} id={props.id}>
      {label && (
        <>
          <Row>
            <Label
              inline={props.inline}
              color={props.labelColor}
              _as={props._labelAs}
              bold
              required={props.required}
            >
              {label}
            </Label>
          </Row>
          <Spacer size="8" display="block" />
        </>
      )}
      <div
        data-cy={props.dataCy}
        style={{ width: props.width ? props.width : 200, position: 'relative' }}
      >
        <BaseSelect
          {...props}
          disabled={props.disabled}
          isFilter={props.isFilter}
          options={props.options}
          value={props.value}
          error={props.error}
          onChange={(e) => {
            if (e && typeof props.onChange === 'function') {
              props.onChange(e);
            }
          }}
          onFocus={props.onFocus}
          placeholder={props.placeholder}
          controlShouldRenderValue={props.controlShouldRenderValue}
        />
        {props.error ? (
          <>
            <Spacer size="4" display="block" />
            <Text _as="b3" color="red">
              {props.error || meta.error}
            </Text>
          </>
        ) : null}
      </div>
    </Container>
  );
};

const Select = (props: any) => {
  const { withFormik = true } = props;

  if (withFormik) {
    return <SelectWithFormikHooks {...props} />;
  }

  return <SelectWithoutFormikHooks {...props} />;
};

export default Select;
