import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
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

export const StyledCheckbox = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  &:hover > svg > rect:first-child {
    stroke: ${colors.blue};
  }

  transition: all 150ms;
  /* ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  } */
`;

const Check = (props: {
  error?: any;
  checked?: boolean;
  checkedSome?: boolean;
  "data-cy"?: string;
  onChange?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const className = "";
  const style = {};
  const { error, checked, checkedSome, onChange, ...rest } = props;

  return (
    <CheckboxContainer className={className} style={style}>
      <HiddenCheckbox checked={checked || checkedSome} {...rest} />
      <StyledCheckbox
        checked={checked || checkedSome}
        onClick={props.onChange}
        data-cy={props["data-cy"]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          {checked ? (
            <>
              <rect
                x="2.5"
                y="2.5"
                width="15"
                height="15"
                rx="2"
                fill={colors.blue}
                stroke={colors.blue}
              />
              <path
                d="M15.7362 6.00738C15.6592 5.92875 15.5661 5.86777 15.4651 5.82444C15.364 5.78272 15.2549 5.76025 15.1441 5.76025C15.0334 5.76025 14.9259 5.78272 14.8232 5.82444C14.7221 5.86617 14.6291 5.92875 14.5521 6.00738L8.34397 12.2241L5.73655 9.60838C5.65632 9.53136 5.56165 9.47038 5.45735 9.42865C5.35305 9.38693 5.24234 9.36768 5.13002 9.36928C5.0177 9.37089 4.90859 9.39496 4.8059 9.43989C4.7032 9.48482 4.61014 9.54901 4.53312 9.62925C4.4561 9.70948 4.39513 9.80416 4.35341 9.90847C4.31169 10.0128 4.29243 10.1235 4.29404 10.2358C4.29564 10.3482 4.31971 10.4573 4.36464 10.56C4.40957 10.6627 4.47375 10.7558 4.55398 10.8328L7.75349 14.0326C7.83051 14.1112 7.92358 14.1722 8.02466 14.2155C8.12575 14.2573 8.23486 14.2797 8.34558 14.2797C8.45629 14.2797 8.5638 14.2573 8.66649 14.2155C8.76758 14.1738 8.86064 14.1112 8.93766 14.0326L15.7378 7.23179C15.8229 7.15315 15.8903 7.05848 15.9368 6.95417C15.9833 6.84826 16.0074 6.73432 16.0074 6.62039C16.0074 6.50485 15.9833 6.39091 15.9368 6.2866C15.8887 6.18069 15.8213 6.08601 15.7362 6.00738Z"
                fill={colors.white}
              />
            </>
          ) : checkedSome ? (
            <>
              <rect
                x="2.5"
                y="2.5"
                width="15"
                height="15"
                rx="2"
                fill={colors.blue}
                stroke={colors.blue}
              />
              <path
                d="M13.3335 9.16675H6.66683C6.44582 9.16675 6.23385 9.25455 6.07757 9.41083C5.92129 9.56711 5.8335 9.77907 5.8335 10.0001C5.8335 10.2211 5.92129 10.4331 6.07757 10.5893C6.23385 10.7456 6.44582 10.8334 6.66683 10.8334H13.3335C13.5545 10.8334 13.7665 10.7456 13.9228 10.5893C14.079 10.4331 14.1668 10.2211 14.1668 10.0001C14.1668 9.77907 14.079 9.56711 13.9228 9.41083C13.7665 9.25455 13.5545 9.16675 13.3335 9.16675Z"
                fill={colors.white}
              />
            </>
          ) : (
            <>
              <rect
                x="2.5"
                y="2.5"
                width="15"
                height="15"
                rx="2"
                fill="white"
                stroke={error ? colors.red : colors.black10}
              />
              <rect
                x="3.3335"
                y="3.33325"
                width="13.3333"
                height="13.3333"
                fill={colors.white}
              />
            </>
          )}
        </svg>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Check;
