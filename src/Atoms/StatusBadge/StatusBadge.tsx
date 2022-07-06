import React from "react";
import styled from "styled-components";
import { Text } from "../";
import colors, { ColorOptions } from "../utils/colors";

interface Props {
  /**
    color for background
   @default "statsGreen"
  **/
  color: ColorOptions;
  width?: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode;
  /**
    customTextColor if you want to customize the text color
  **/
  customTextColor?: ColorOptions;
}

interface RootProps extends Props {
  clickable: boolean;
}
const Root = styled.div<RootProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => colors[color as ColorOptions]};
  border-radius: 20px;
  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  margin-left: auto;
  margin-right: auto;
`;

export default function StatusBadge({
  color = "statsGreen",
  children,
  width = "150px",
  height = "22px",
  customTextColor,
  onClick,
}: Props) {
  const textColor =
    customTextColor ||
    (color.includes("10") ? color.replace("10", "") : `${color}10`);
  return (
    <Root
      color={color}
      width={width}
      height={height}
      onClick={onClick}
      clickable={
        onClick ? {}.toString.call(onClick) === "[object Function]" : false
      }
    >
      <StyledText _as="s6" bold color={textColor as ColorOptions}>
        {children}
      </StyledText>
    </Root>
  );
}
