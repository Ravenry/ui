import React from "react";
import styled, { css } from "styled-components";
import Responsive from "../utils/responsive";
import colors from "../utils/colors";

/* Tooltip container */
const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* border-bottom: 1px dotted black; If you want dots under the hoverable text */
`;
const TooltipText = styled.div`
  /* Tooltip text */
  ${({ wrapText }) => (wrapText ? "" : "white-space: nowrap;")}
  display: none;
  ${({ width }) => width && `width: ${width};`}
  background-color: ${(props) =>
    props.color ? colors[props.color] : colors.black100};
  color: ${(props) => (props.color ? colors.white : colors.black5)};
  text-align: center;
  padding: 8px 16px;
  font-size: 0.625rem;
  line-height: 12px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  /* Position the tooltip text - see examples below! */
  ${(props) =>
    props.position === "left"
      ? css`
          top: -5px;
          right: 105%;
        `
      : props.position === "right"
      ? css`
          top: -5px;
          left: 105%;
        `
      : props.position === "top"
      ? css`
          bottom: 160%;
          right: -100%;
          /* margin-left: -60px; */
        `
      : props.position === "bottom"
      ? css`
          top: 100%;
          left: 50%;
          margin-left: -60px;
        `
      : props.position === "bottom-right"
      ? css`
          top: 100%;
          left: 50%;
        `
      : props.position === "bottom-left"
      ? css`
          top: 100%;
          right: 50%;
        `
      : typeof props.position === "object" &&
        ("top" in props.position ||
          "right" in props.position ||
          "left" in props.position ||
          "bottom" in props.position)
      ? css`
          ${props.position.top ? `top: ${props.position.top};` : ""}
          ${props.position.right ? `right: ${props.position.right};` : ""}
          ${props.position.bottom ? `bottom: ${props.position.bottom};` : ""}
          ${props.position.left ? `left: ${props.position.left};` : ""}
        `
      : css`
          top: -5px;
          right: 105%;
        `}
  position: absolute;
  z-index: 10;
  ${TooltipContainer}:hover & {
    display: block;
  }
  &::after {
    content: "";
    position: absolute;
    ${({ arrowPosition }) =>
      arrowPosition === "right"
        ? css`
            top: calc(50% - 6px);
            left: -6px;
            transform: rotate(90deg);
          `
        : arrowPosition === "left"
        ? css`
            top: calc(50% - 6px);
            right: -12px;
            transform: rotate(-90deg);
          `
        : arrowPosition === "top"
        ? css`
            top: calc(0% - 12px);
            right: 20px;
            transform: rotate(-180deg);
          `
        : arrowPosition === "bottom"
        ? css`
            bottom: calc(0% - 12px);
            right: 20px;
            transform: rotate(-0deg);
          `
        : arrowPosition === "bottom center" || arrowPosition === "bottom-center"
        ? css`
            bottom: calc(0% - 12px);
            right: calc(50% - 6px);
            transform: rotate(-0deg);
          `
        : css`
            top: 100%;
            left: 90%;
          `}
    margin-left: -6px;
    border-width: 6px;
    border-style: ${(props) => (props.noArrow ? "" : "solid")};
    /* box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1); */
    /* -webkit-transform: rotate(-45deg); */
    border-color: ${(props) =>
        props.color ? colors[props.color] : colors.black100}
      transparent transparent transparent;
  }
`;

/**
 * Tooltip
 *
 * @param {Object} props - component props
 * @param {string} [props.content] - content of the tooltip
 * @param {"left" | "right" | "top" | "bottom" |
 *         "bottom-right" | "bottom-left" |
 *          | String | {top:String, right: string}
 *          | {top: string, left: string}} [props.position] - position of the tooltip
 * @param {"left" | "right" | "top" | "bottom" |
 *         "bottom-right" | "bottom-left" | "bottom-center" |
 *         {top: string, right: string}} [props.arrowPosition] - position of the arrow
 * @param {React.CSSProperties} [props.textStyle] - add inline style for TooltipText
 * @param {Boolean} [props.wrapText] - make the tooltip have fixed width and multiple line
 * @param {React.ReactNode} props.children
 */
export default function Tooltip(props) {
  const { textStyle, wrapText } = props;
  const { isMobile } = Responsive();
  return (
    <TooltipContainer isMobile={isMobile}>
      {props.children}
      <TooltipText {...props} style={textStyle} wrapText={wrapText}>
        {props.content}
      </TooltipText>
    </TooltipContainer>
  );
}
