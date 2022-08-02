import React from "react";
import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import colors from "../utils/colors";

const TextareaInput = styled(TextareaAutosize)<{
  borderRadius?: string;
  icon?: any;
  padding?: string;
  error?: boolean;
  success?: boolean;
  noBorder?: boolean;
  cursor?: string;
}>`
  background: #ffffff;
  border: 1px solid ${colors.black10};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${(props) =>
    props.icon
      ? "12px 40px 12px 16px"
      : props.padding
      ? props.padding
      : "12px 16px"};
  font-size: 0.875rem;
  line-height: 1.25rem;
  resize: none;
  overflow-y: hidden;
  width: 100%;

  ${(props) =>
    props.error
      ? css`
          border: 1px solid ${colors.red};
          color: ${colors.red};
          &::placeholder {
            color: ${colors.red};
            font-size: 0.875rem;
          }
        `
      : props.success
      ? css`
          border: 1px solid ${colors.green};
          color: ${colors.green};
          &::placeholder {
            color: ${colors.green};
            font-size: 0.875rem;
          }
        `
      : props.noBorder
      ? css`
          border: none;
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black50};
            font-size: 0.875rem;
          }
        `
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black50};
            font-size: 0.875rem;
          }
        `}

  ${({ cursor }) => cursor && `cursor: ${cursor};`}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    /* box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2); */
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }

  &:hover {
    /* ${({ noBorder }) =>
      noBorder
        ? "box-shadow: none;"
        : "box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"} */

    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }
`;

const TextareaInputBasic = styled.textarea<{
  borderRadius?: string;
  icon?: any;
  padding?: string;
  error?: boolean;
  success?: boolean;
  noBorder?: boolean;
  cursor?: string;
  height?: string;
}>`
  background: #ffffff;
  border: 1px solid #d6d6d7;
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius};
  ${({ height }) => (height ? `height: ${height};` : "")}
  padding: ${(props) =>
    props.icon
      ? "12px 40px 12px 16px"
      : props.padding
      ? props.padding
      : "12px 16px"};
  font-size: 0.875rem;
  line-height: 1.25rem;
  resize: none;
  width: 100%;

  ${(props) =>
    props.error
      ? css`
          border: 1px solid ${colors.red};
          color: ${colors.red};
          &::placeholder {
            color: ${colors.red};
            font-size: 0.875rem;
          }
        `
      : props.success
      ? css`
          border: 1px solid ${colors.green};
          color: ${colors.green};
          &::placeholder {
            color: ${colors.green};
            font-size: 0.875rem;
          }
        `
      : props.noBorder
      ? css`
          border: none;
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black20};
            font-size: 0.875rem;
          }
        `
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black20};
            font-size: 0.875rem;
          }
        `}

  ${({ cursor }) => cursor && `cursor: ${cursor};`}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    /* box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2); */
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }

  /* &:hover {
    ${({ noBorder }) =>
    noBorder
      ? "box-shadow: none;"
      : "box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"}
  } */
`;

export default function Textarea(props: {
  id?: string;
  name?: string;
  icon?: any;
  error?: boolean;
  success?: boolean;
  minRows?: number;
  maxRows?: number;
  basic?: boolean;
  borderRadius?: string;
  maxLength?: number;
  dataCy?: string;
  height?: string;
}) {
  const {
    id,
    name,
    icon,
    error,
    success,
    minRows = 3,
    maxRows = 100,
    basic,
    maxLength,
    borderRadius = "5px",
    dataCy,
    height,
  } = props;

  return (
    <>
      {basic ? (
        <TextareaInputBasic
          {...props}
          name={name}
          id={id}
          data-cy={dataCy}
          height={height}
          borderRadius={borderRadius}
          icon={icon}
          success={success}
          error={error}
        />
      ) : (
        <TextareaInput
          {...props}
          minRows={minRows}
          maxRows={maxRows}
          maxLength={maxLength}
          name={name}
          id={id}
          data-cy={dataCy}
          borderRadius={borderRadius}
          icon={icon}
          success={success}
          error={error}
        />
      )}
    </>
  );
}
