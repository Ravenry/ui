import React from "react";
import styled, { css, keyframes } from "styled-components";

import getElevation from "../utils/elevations";
import Icon from "../Icon/Icon";
import Spacer from "../Spacer/Spacer";
import colors, { ButtonColorOptions, ColorOptions } from "../utils/colors";
import { media } from "../utils/devices";

type ButtonVariant = "contained" | "outlined" | "text";

const getPadding = ({
  startIcon,
  endIcon,
}: {
  startIcon: boolean;
  endIcon: boolean;
}) => {
  const onlyLeftIcon = startIcon && !endIcon;
  const onlyRightIcon = !startIcon && endIcon;

  if (onlyLeftIcon) {
    return "0 24px 0 16px";
  }

  if (onlyRightIcon) {
    return "0 16px 0 24px";
  }

  return "0 16px";
};

const styles = {
  contained: {
    default: css`
      background-color: ${({ color }: { color: ButtonColorOptions }) =>
        colors[color]};
      border: none;
      color: ${colors.white};
      ${getElevation(2)}

      & > span > span > svg > path {
        fill: ${colors.white};
      }
    `,
    disabled: css`
      background-color: ${colors.black10};
      border: none;
      color: ${colors.black50};

      & > span > span > svg > path {
        fill: ${colors.black50};
      }
    `,
    hovered: css`
      background-color: ${({ color }: { color: ButtonColorOptions }) =>
        colors[`${color}90` as ColorOptions]};
      border: none;
      color: ${colors.white};
      ${getElevation(4)}

      & > span > span > svg > path {
        fill: ${colors.white};
      }
    `,
    pressed: css`
      background-color: ${({ color }: { color: ButtonColorOptions }) =>
        colors[color]};
      border: none;
      color: ${colors.white};
      ${getElevation(2)}

      & > span > span > svg > path {
        fill: ${colors.white};
      }
    `,
  },

  outlined: {
    default: css`
      background-color: ${colors.white};
      border: ${({ color }: { color: ButtonColorOptions }) =>
        `1px solid ${colors[color]}`};
      color: ${({ color }: { color: ButtonColorOptions }) => colors[color]};
      ${getElevation(2)}

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) => colors[color]};
      }
    `,
    disabled: css`
      background-color: ${colors.black10};
      border: 1px solid ${colors.black50};
      color: ${colors.black50};

      & > span > span > svg > path {
        fill: ${colors.black50};
      }
    `,
    hovered: css`
      background-color: ${({ color }: { color: ButtonColorOptions }) =>
        colors[`${color}10` as ColorOptions]};
      border: ${({ color }: { color: ButtonColorOptions }) =>
        `1px solid ${colors[`${color}90` as ColorOptions]}`};
      color: ${({ color }: { color: ButtonColorOptions }) =>
        colors[`${color}90` as ColorOptions]};
      ${getElevation(4)}

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) =>
          colors[`${color}90` as ColorOptions]};
      }
    `,
    pressed: css`
      background-color: ${colors.white};
      border: ${({ color }: { color: ButtonColorOptions }) =>
        `1px solid ${colors[color]}`};
      color: ${({ color }: { color: ButtonColorOptions }) => colors[color]};
      ${getElevation(2)}

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) => colors[color]};
      }
    `,
  },

  text: {
    default: css`
      background-color: transparent;
      border: none;
      color: ${({ color }: { color: ButtonColorOptions }) =>
        color === "black" ? colors.black60 : colors[color]};

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) =>
          color === "black" ? colors.black60 : colors[color]};
      }
    `,
    disabled: css`
      background-color: transparent;
      border: none;
      color: ${colors.black50};

      & > span > span > svg > path {
        fill: ${colors.black50};
      }
    `,
    hovered: css`
      background-color: ${colors.black5};
      border: none;
      color: ${({ color }: { color: ButtonColorOptions }) =>
        color === "black"
          ? colors.black
          : colors[`${color}90` as ColorOptions]};

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) =>
          color === "black"
            ? colors.black
            : colors[`${color}90` as ColorOptions]};
      }
    `,
    pressed: css`
      background-color: ${colors.black5};
      border: none;
      color: ${({ color }: { color: ButtonColorOptions }) =>
        color === "black"
          ? colors.black
          : colors[`${color}90` as ColorOptions]};

      & > span > span > svg > path {
        fill: ${({ color }: { color: ButtonColorOptions }) =>
          color === "black"
            ? colors.black
            : colors[`${color}90` as ColorOptions]};
      }
    `,
  },
};

const getStyle = ({
  variant,
  state,
}: {
  variant: ButtonVariant;
  state: "default" | "pressed" | "hovered" | "disabled";
}) => styles[variant][state];

const gradient = keyframes`
  0% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

interface LabelProps {
  hasIcon?: boolean;
}

const Label = styled.span<LabelProps>`
  ${({ hasIcon }) =>
    hasIcon
      ? ""
      : `
      width: 100%;
      margin: auto;
      `}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.span<{
  iconPosition: "left" | "right";
  iconSpacing?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ iconPosition, iconSpacing }) =>
    iconPosition === "left"
      ? `margin-right: ${iconSpacing || "8px"};`
      : `margin-left: ${iconSpacing || "8px"};`}
`;

export interface ButtonProps {
  icon?: string; // to be deprecated
  iconAlignment?: string; // to be deprecated
  iconFill?: ButtonColorOptions;
  /** custom icon spacing */
  iconSpacing?: string;
  startIcon?: string;
  endIcon?: string;
  linkedIn?: boolean;
  rounded?: string; //border-radius

  height?: string;
  fluid?: boolean;
  width?: string;
  newPadding?: boolean; // default to true
  transparent?: boolean; // to be deprecated
  // custom padding
  padding?: string | number;

  textAlign?: string;
  bold?: boolean; // default to true
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  textColor?: ButtonColorOptions;

  whiteBorder?: boolean; // to be deprecated
  primary?: boolean; // to be deprecated
  /** variant of button, default to 'contained' */
  variant?: ButtonVariant;
  color?: ButtonColorOptions;
  secondary?: boolean; // to be deprecated
  inverted?: boolean; // to be deprecated

  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  mediaQuery?: string;

  "data-cy"?: string;

  children: React.ReactNode;
}

interface ContainerProps extends ButtonProps {
  variant: ButtonVariant;
  color: ButtonColorOptions;
  customMargin?: string;
}

const Container = styled.button<ContainerProps>`
  height: ${({ height }) => height || "32px"};
  min-width: 110px;
  width: ${({ fluid, width, transparent, newPadding }) =>
    fluid ? "100%" : width || (transparent || newPadding ? "auto" : "150px")};
  border-radius: ${({ rounded }) => rounded || "5px"};
  text-align: ${({ textAlign }) => textAlign || "center"};
  font-weight: ${({ bold, fontWeight }) =>
    bold ? "bold" : fontWeight || "normal"};
  font-size: ${({ fontSize }) => fontSize || "14px"};
  line-height: ${({ lineHeight }) => lineHeight || "18px"};
  letter-spacing: 0.5px;
  /* line-height: ${({ height }) => height || "32px"}; */
  padding: ${({ startIcon, endIcon, variant, padding }) =>
    variant === "text"
      ? "0 8px"
      : padding || getPadding({ startIcon: !!startIcon, endIcon: !!endIcon })};
  display: flex;
  justify-content: ${({ textAlign }) =>
    textAlign === "left" ? "flex-start" : "center"};
  align-items: center;
  cursor: pointer;
  ${({ customMargin }) => (customMargin ? `margin: ${customMargin};` : null)}
  /* transition: all 0.3s ease; */
  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
  }

  ${({ disabled, variant }) =>
    disabled
      ? getStyle({ variant, state: "disabled" })
      : css<{ color: ButtonColorOptions }>`
          ${getStyle({ variant, state: "default" })}

          &:hover {
            ${getStyle({ variant, state: "hovered" })}
          }

          &:active {
            ${getStyle({ variant, state: "pressed" })}
          }
        `}

  &:hover ${Label} {
    ${({ transparent, color }) =>
      transparent ? `border-bottom: 1px solid ${colors[color || "blue"]};` : ""}
  }

  ${({ loading }) =>
    loading &&
    css`
      background: linear-gradient(90deg, ${colors.black60}, ${colors.black20});
      background-size: 400% 100%;
      animation: ${gradient} 2s ease infinite;
    `}

  ${({ mediaQuery }) => media(mediaQuery)}
`;

export default function Button(props: ButtonProps) {
  const {
    newPadding = true,
    color = "blue",
    variant = "contained",
    startIcon,
    endIcon,
    bold = true,
    iconSpacing,
    rounded,
  } = props;

  return (
    <Container
      {...props}
      newPadding={newPadding}
      color={color}
      variant={variant}
      bold={bold}
      data-cy={props["data-cy"]}
    >
      {props.icon && props.iconAlignment !== "right" && (
        <>
          <Icon
            name={props.icon}
            fill={props.disabled ? "black40" : props.iconFill || "white"}
          />
          <Spacer size={8} />
        </>
      )}
      <Label hasIcon={!!props.icon}>
        {props.linkedIn ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 52,
                borderRight: "1px solid white",
                height: 32,
                padding: 7,
                position: "absolute",
              }}
            >
              <path
                d="M20 18.8805V11.5912C20 7.6478 17.8313 5.85535 15.0602 5.85535C12.7711 5.85535 11.8072 7.05031 11.2048 8.00629V6.21384H6.86747C6.86747 7.4088 6.86747 19 6.86747 19H11.2048V11.8302C11.2048 11.4717 11.2048 11.1132 11.3253 10.7547C11.6867 10.0377 12.2892 9.20126 13.494 9.20126C15.0602 9.20126 15.6627 10.3962 15.6627 12.0692V18.8805H20ZM2.40964 4.42138C3.85542 4.42138 4.81928 3.46541 4.81928 2.15094C4.81928 0.836477 3.85542 0 2.40964 0C0.963856 0 0 0.955974 0 2.15094C0 3.34591 0.963856 4.42138 2.40964 4.42138ZM4.57831 18.8805V6.09434H0.240964V18.8805H4.57831Z"
                fill="white"
              />
            </svg>
            <div style={{ flexGrow: 1 }}>{props.children}</div>
          </div>
        ) : (
          <>
            {startIcon ? (
              <IconContainer iconPosition="left" iconSpacing={iconSpacing}>
                <Icon name={startIcon} />
              </IconContainer>
            ) : null}
            {props.children}
            {endIcon ? (
              <IconContainer iconPosition="right" iconSpacing={iconSpacing}>
                <Icon name={endIcon} />
              </IconContainer>
            ) : null}{" "}
          </>
        )}
      </Label>
      {props.icon && props.iconAlignment === "right" && (
        <>
          <Icon name={props.icon} fill={props.iconFill || "white"} />
          <Spacer size={8} />
        </>
      )}
    </Container>
  );
}
