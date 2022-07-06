import React from "react";
import styled from "styled-components";
import colors, { ColorOptions } from "../utils/colors";

interface RootProps extends Props {
  clickable: boolean;
}

const Root = styled.div<RootProps>`
  width: ${({ width }) => (width ? width : "150x")};
  height: ${({ height }) => (height ? height : "20px")};
  border: 1px solid ${({ color }) => (color ? colors[color] : colors.black100)};
  color: ${({ color }) => (color ? colors[color] : colors.black100)};
  background-color: ${({ color }) =>
    color ? colors[(color + "20") as ColorOptions] : colors.black20};
  border-radius: 20px;
  font-size: 0.625rem;
  line-height: ${({ height }) => (height ? height : "20px")};
  ${({ clickable }) => (clickable ? `cursor: pointer;` : "")}
  text-align: center;
  font-weight: 700;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

interface Props {
  color: ColorOptions;
  width: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * Tag
 *
 * @param {Object} props
 * @param {String} [props.color] - color of tag, without percentage
 * @param {String} [props.width] - custom width, default 150px
 * @param {String} [props.height] - custom height, default 20px
 * @param {Function} [props.onClick]
 */
export default function ColoredTag({
  color,
  children,
  width,
  height,
  onClick,
}: Props) {
  return (
    <Root
      color={color}
      width={width}
      height={height}
      onClick={onClick}
      clickable={
        (onClick && {}.toString.call(onClick) === "[object Function]") || false
      }
    >
      {children}
    </Root>
  );
}
