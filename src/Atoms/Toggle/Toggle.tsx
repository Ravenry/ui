import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;

  & > input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

interface InputStyleProps {
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

const Input = styled.input<InputStyleProps>`
  &:checked + .slider {
    background-color: ${colors.blue90};
  }

  &:focus + .slider {
    box-shadow: 0 0 1px ${colors.blue90};
  }

  &:disabled + .slider {
    background-color: ${colors.black20};
  }

  &:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
`;

const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.black20};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

// @TODO to prevent confusion, this should be renamed to Slider
// since there is another component called ToggleButton
/**
 * Toggle
 *
 * @param {Object} props
 * @param {Boolean} [props.checked]
 * @param {Boolean} [props.disabled]
 * @param {Function} [props.onChange]
 */
export default function Toggle(props: ToggleProps) {
  const { checked, disabled, onChange } = props;
  return (
    <Label>
      <Input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Span className="slider" />
    </Label>
  );
}
