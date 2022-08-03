import styled, { css } from "styled-components";

import colors from "../utils/colors";

export interface Props {
  icon: any;
  error: any;
  success: any;
  disabled: any;
  width: any;
  height?: string;
  borderRadius?: string;
}

const Text = styled.input.withConfig({
  // add props to the array to prevent them passed to the element
  // loading is prevented to remove warning in developer console
  // since it is used only for styled-components styling condition
  // onGetValue is prevented to remove warning in developer console
  // since it is used only for performing app logic
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["loading", "onGetValue", "onIconClick"].includes(prop) &&
    defaultValidatorFn(prop),
})<Props>`
  background: #ffffff;
  border: 1px solid ${colors.black10};
  height: ${({ height }) => height || "32px"};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  padding: ${({ icon }) => (icon ? "12px 40px 12px 16px" : "12px 16px")};
  font-size: 0.875rem;
  line-height: 1.125rem;

  width: ${({ width }) => width || "100%"};

  ${({ error, success }) =>
    error
      ? css`
          border: 1px solid ${colors.red};
          color: ${colors.red};
          &::placeholder {
            color: ${colors.red};
          }
        `
      : success
      ? css`
          border: 1px solid ${colors.green};
          color: ${colors.green};
          &::placeholder {
            color: ${colors.green};
          }
        `
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black60};
          }
        `}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }

  &:hover {
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }

  &:disabled {
    color: ${colors.black50};
    background-color: ${colors.black10};
    border: 1px solid ${colors.black50};
  }
`;

export default Text;
