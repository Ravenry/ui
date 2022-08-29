import styled, { css } from 'styled-components';

import colors from '../../utils/colors';

export const defaultInputWidth = '400px';

export const Container = styled.div`
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

export const Warning = styled.div`
  position: absolute;
  right: 16px;
  top: 10px;
`;

export const Root = styled.div`
  position: relative;
  width: ${(props) => (props.fluid ? '100%' : props.width ? props.width : defaultInputWidth)};
  margin: ${({ rootMargin }) => rootMargin || '8px 0px'};
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  padding: 10px;
`;

export const ErrorText = styled.div`
  color: ${colors.red};
  font-size: 0.75rem;
  line-height: 16px;
  letter-spacing: 0.1px;
  margin: 0;
`;
export const Label = styled.div`
  font-size: 0.75rem;
  line-height: 16px;
  margin: 8px 0px 0px 0px;
  color: ${colors.black60};
`;

export const SuccessText = styled.div`
  color: ${colors.green};
  font-size: 0.625rem;
  line-height: 16px;
  margin: 8px 0px 0px 0px;
`;

export const Counter = styled.div`
  color: ${(props) => (props.full ? colors.red : props.warning ? colors.yellow : colors.green)};
  font-size: 0.625rem;
  line-height: 16px;
  margin: 0px;
  width: 100%;
  text-align: right;
`;

export const DefaultInput = styled.input`
  background: #ffffff;
  border: 1px solid ${colors.black10};
  box-sizing: border-box;
  border-radius: 5px;
  padding: ${(props) => (props.icon ? '12px 40px 12px 16px' : '12px 16px')};
  font-size: 0.875rem;
  line-height: 1.125rem;

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
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black20};
            font-size: 0.875rem;
          }
        `}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.black100};`}
  }

  &:hover {
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.black60};`}
  }

  &:disabled {
    color: ${colors.black40};
    background-color: ${colors.black5};
  }
`;

export const SelectInput = styled.select`
  background: #ffffff;
  border: 1px solid #d6d6d7;
  box-sizing: border-box;
  border-radius: 5px;
  /* padding: ${(props) => (props.icon ? '12px 40px 12px 16px' : '12px 16px')}; */
  padding: 12px 16px;
  font-size: 0.875rem;
  line-height: 1.125rem;

  width: ${(props) => (props.fluid ? '100%' : props.width ? props.width : defaultInputWidth)};

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
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black20};
            font-size: 0.875rem;
          }
        `}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    /* box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2); */
  }

  &:hover {
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
  }
`;

// CHECKBOX

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  /* clippath: inset(50%); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledCheckbox = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? colors.blue : colors.white)};
  border-radius: ${(props) => (props.type === 'radio' ? '8px' : '3px')};
  transition: all 150ms;
  border: 2px solid ${(props) => (props.checked ? colors.blue : colors.black10)};

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

// END OF CHECKBOX
