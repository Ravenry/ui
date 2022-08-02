import React from "react";
import styled from "styled-components";

import { CheckboxContainer, HiddenCheckbox } from "./Check";
import colors from "../utils/colors";

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledRadio = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  transition: all 150ms;
  &:hover > svg > circle:first-child {
    stroke: ${colors.blue};
  }
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const Radio = (props: {
  className?: string;
  checked?: boolean;
  style?: React.CSSProperties;
  onChange?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { className, style, checked, onChange, ...rest } = props;

  return (
    <CheckboxContainer className={className} style={style}>
      <HiddenCheckbox checked={checked} {...rest} />
      <StyledRadio checked={checked} onClick={props.onChange} type="radio">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {checked ? (
            <>
              <circle
                xmlns="http://www.w3.org/2000/svg"
                cx="10"
                cy="10"
                r="7.5"
                stroke={colors.blue}
              />
              <circle
                xmlns="http://www.w3.org/2000/svg"
                cx="10"
                cy="10"
                r="5.5"
                fill={colors.blue}
              />
            </>
          ) : (
            <circle
              xmlns="http://www.w3.org/2000/svg"
              cx="10"
              cy="10"
              r="7.5"
              stroke={colors.black10}
            />
          )}
        </svg>
      </StyledRadio>
    </CheckboxContainer>
  );
};

export default Radio;
