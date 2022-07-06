import React from "react";
import styled from "styled-components";
import colors, { ColorOptions } from "../utils/colors";

interface TagStyleProps {
  style?: React.CSSProperties;
  height?: string | number;
  clickable?: boolean;
  onClick?: React.MouseEventHandler;
  color?: ColorOptions;
  // custom background color, default is transparent
  backgroundColor?: ColorOptions;
  border?: ColorOptions;
  hover?: boolean;
  hoverBorder?: ColorOptions;
  // custom padding, default is 6px 24px
  padding?: string;
  // to enable wrapping this component with another styled()
  className?: string;
}

const Root = styled.div<TagStyleProps>`
  padding: ${({ padding }) => padding || `6px 24px`};
  height: ${({ height }) => height || "32px"};
  border: 1px solid
    ${({ border }) => (border ? colors[border] : colors.black10)};
  border-radius: 16px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;

  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}
  ${({ color }) => (color ? `color: ${colors[color]};` : "")}
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${colors[backgroundColor]};` : ""}

  ${(props) =>
    props.hover &&
    `&:hover {
        border: 1px solid ${
          props.hoverBorder ? colors[props.hoverBorder] : colors.black10
        };
      }
    `}

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

interface TagProps extends TagStyleProps {
  children: React.ReactNode;
}

/**
 * Tag
 *
 * @param {Object} props
 * @param {String} [props.key]
 * @param {React.CSSProperties} [props.style] - custom style
 * @param {String} [props.height] - custom height
 * @param {Boolean} [props.clickable] -
 * @param {Function} [props.onClick]
 * @param {Boolean} [props.hover]
 */
export default function Tag(props: TagProps) {
  const {
    children,
    style = {},
    height,
    clickable,
    onClick = () => {},
    color,
    backgroundColor,
    border,
    hover,
    hoverBorder,
    padding,
    className,
  } = props;

  return (
    <Root
      style={style}
      height={height}
      padding={padding}
      onClick={onClick}
      clickable={clickable}
      color={color}
      border={border}
      hover={hover}
      hoverBorder={hoverBorder}
      backgroundColor={backgroundColor}
      className={className}
    >
      {children}
    </Root>
  );
}
