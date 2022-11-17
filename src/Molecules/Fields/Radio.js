import React from 'react';
import styled from 'styled-components';
import { Label, Icon, Text, Spacer, Input } from '@ravenry/ui';

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  padding: 10px;
`;

export default function Radio(props) {
  const {
    id,
    name,
    icon,
    error,
    success,
    label,
    labelColor,
    onChange,
    style,
    fluid,
    placeholder,
    maxLength,
    value,
    labelAs,
    labelBold,
  } = props;

  return (
    <div style={{ width: 'fit-content', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <Input.Radio
        onChange={onChange}
        style={style}
        name={name}
        id={id}
        fluid={fluid}
        error={error}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <Spacer size="12.5" horizontal />
      {label ? (
        <Label htmlFor={id || name} clickable color={labelColor} _as={labelAs} bold={labelBold}>
          {label}
        </Label>
      ) : null}
      {icon && (
        <IconContainer>
          <Icon name={icon} fill={error ? 'red' : success && 'green'} />
        </IconContainer>
      )}
      {error ? (
        <>
          <Spacer size="8" display="block" />
          <Text _as="b3" color="red">
            {error}
          </Text>
        </>
      ) : null}
      {success ? (
        <>
          <Spacer size="8" display="block" />
          <Text _as="b3" color="green">
            {success}
          </Text>
        </>
      ) : null}
    </div>
  );
}
