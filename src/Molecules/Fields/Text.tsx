import React from 'react';
import styled from 'styled-components';
import colors, { ColorOptions } from 'ui/colors';
import { Label, Icon, Text as P, Row, Spacer, Input } from '@ravenry/ui';

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  padding: 6px;
`;

const defaultInputWidth = '400px';

interface RootProps {
  position?: string;
  fluid?: boolean;
  width?: string;
  height?: string;
  error?: string;
  success?: string;
}

const Root = styled.div<RootProps>`
  position: relative;
  width: ${(props) => (props.fluid ? '100%' : props.width ? props.width : defaultInputWidth)};
  color: ${({ error, success }) => (error ? colors.red : success ? colors.green : colors.black50)};
  &:hover {
    color: ${colors.black};
  }
`;

interface Props {
  id?: string;
  name?: string;
  icon?: string;
  error?: string;
  success?: string;
  label?: string;
  /**
   * Set custom spacing between label (or subtitle if it is provided) and input field
   * in pixel but only accept numeric value
   * @example "16", 12
   * @default 8
   */
  space?: string | number;
  message?: string;
  /**
   * Text between label in input field
   */
  subtitle?: string;
  /**
   * Set custom spacing between label and subtitle, in pixel but only accept numeric value
   * @example "16", 12
   * @default 4
   */
  subtitleSpacing?: string | number;
  labelColor?: ColorOptions;
  _labelAs?:
    | 'b1'
    | 'b2'
    | 'b3'
    | 's1'
    | 's2'
    | 's3'
    | 's4'
    | 's5'
    | 's6'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'n1'
    | 'btn1'
    | 'btn2';
  type?: string;
  inputMode?: 'decimal';
  /**
   * Set label as uppercased
   * @default true
   */
  labelUppercase?: boolean;
  onChange?: (e?: any) => void;
  style?: object;
  fluid?: boolean;
  bold?: boolean;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  onIconClick?: () => void;
  iconClickable?: boolean;
  required?: boolean;
  disabled?: boolean;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  /**
   * to display error text too, make it false to hide the text
   * @default true
   **/
  withErrorText?: boolean;
  /**
   * to enable cypress accessing error message
   */
  'data-cy-error'?: string;
}

export default function Text(props: Props) {
  const {
    id,
    name,
    icon,
    error,
    success,
    label,
    labelUppercase = true,
    message,
    subtitle,
    labelColor,
    _labelAs,
    type,
    inputMode,
    onChange,
    style,
    fluid,
    placeholder,
    maxLength,
    value,
    width,
    height,
    borderRadius,
    onIconClick,
    iconClickable,
    required = false,
    withErrorText = true,
    space = 8,
    subtitleSpacing = 4,
    bold = true,
  } = props;

  return (
    <>
      {label ? (
        <div>
          <Row>
            <Label htmlFor={name} _as={_labelAs} color={labelColor} bold={bold} required={required}>
              {labelUppercase ? label.toUpperCase() : label}
            </Label>
          </Row>
          {message ? (
            <div>
              <Spacer size="8" display="block" />
              <P _as="s6" color="black80">
                {message}
              </P>
            </div>
          ) : null}
          {subtitle ? (
            <div>
              <Spacer size={subtitleSpacing} display="block" />
              <P _as="s6" color="black80">
                {subtitle}
              </P>
            </div>
          ) : null}
          <Spacer size={space} display="block" />
        </div>
      ) : null}
      <div>
        <Root width={width} fluid={fluid} error={error} success={success}>
          <Input
            onChange={onChange}
            style={style}
            type={type || 'text'}
            inputMode={inputMode}
            name={name}
            id={id}
            fluid={fluid}
            error={error}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            width={width}
            height={height}
            borderRadius={borderRadius}
            {...props}
            required={false}
          />
          {icon && (
            // <Label _as={_labelAs} htmlFor={name} color={labelColor} bold >
            <Label _as={_labelAs} htmlFor={name} color={labelColor} bold>
              <IconContainer>
                <Icon
                  name={icon}
                  onClick={onIconClick}
                  clickable={iconClickable}
                  fill={error ? 'red' : success ? 'green' : 'black50'}
                  // hoverFill="black"
                  currentColor={!error}
                  hover
                />
              </IconContainer>
            </Label>
          )}
        </Root>
        {error && withErrorText ? (
          <>
            <Spacer size="4" display="block" />
            <P _as="b3" color="red" data-cy-error={props['data-cy-error']}>
              {error}
            </P>
          </>
        ) : null}
        {success ? (
          <>
            <Spacer size="4" display="block" />
            <P _as="b3" color="green">
              {success}
            </P>
          </>
        ) : null}
      </div>
    </>
  );
}
