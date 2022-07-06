import React from "react";
import styled from "styled-components";
import colors, { ColorOptions } from "../utils/colors";
import { isMobile, isBrowser } from "react-device-detect";
import { Spacer } from "../";

const Flex = styled.div`
  display: flex;
  /* align-content: center; */
  align-items: flex-start;
  width: 100%;
  font-size: 0.75rem;
  flex-direction: row;
`;

interface TextProps {
  bold?: boolean;
  color?: ColorOptions;
  width?: string;
  children: React.ReactNode;
}

const Text = styled.div<TextProps>`
  display: block;
  width: ${({ width }) => width || "auto"};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  color: ${({ color }) => (color ? colors[color] : colors.black)};
`;

interface BarProps {
  width: string;
}

const Bar = styled.div<BarProps>`
  display: flex;
  width: ${({ width }) => width || "auto"};
  flex-direction: column;
`;

interface BarItemProps {
  first: boolean;
  last: boolean;
  color: ColorOptions;
}

const BarItem = styled.div<BarItemProps>`
  display: block;
  width: calc(100% - 2px);
  height: 8px;
  margin-top: 8px;
  margin-right: 4px;
  border-radius: ${({ first, last }) =>
    first ? "4px 0px 0px 4px" : last ? "0px 4px 4px 0px" : "0px"};
  background-color: ${({ color }) => (color ? colors[color] : "transparent")};
`;

interface Props {
  status: number;
  statusOptions: string[];
}

export default function BigStatus({ status, statusOptions }: Props) {
  const barWidth = 100 / statusOptions.length;

  return (
    <>
      {isMobile && <Text width="100%">{statusOptions[status]}</Text>}
      <Flex>
        {isBrowser &&
          statusOptions.map((stat, i) => {
            return (
              <Bar key={"status-option-" + i} width={barWidth + "%"}>
                <Text
                  color={
                    i > status ? "black40" : i < status ? "black40" : "black"
                  }
                >
                  {stat}
                </Text>
                <BarItem
                  first={i === 0}
                  last={i === statusOptions.length - 1}
                  color={i <= status ? "lightBlue40" : "backgroundDark"}
                />
              </Bar>
            );
          })}

        {isMobile &&
          statusOptions.map((stat, i) => {
            return (
              <Bar key={"stat-option-mobile-" + stat} width={barWidth + "%"}>
                <BarItem
                  first={i === 0}
                  last={i === statusOptions.length - 1}
                  color={i <= status ? "lightBlue40" : "backgroundDark"}
                />
              </Bar>
            );
          })}
      </Flex>
      <Spacer size={12} />
    </>
  );
}
