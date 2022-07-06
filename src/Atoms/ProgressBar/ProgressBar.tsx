import React from "react";
import styled, { css } from "styled-components";

import colors, { ColorOptions } from "../utils/colors";

const Root = styled.div`
  display: flex;
  gap: 2px;
  /* align-content: center; */
  align-items: flex-start;
  width: 100%;
  font-size: 0.75rem;
  flex-direction: row;
  margin-top: 16px;
`;

const Bar = styled.div<{ width: string }>`
  position: relative;
  display: flex;
  width: ${(props) => props.width && props.width};
  flex-direction: column;
`;

const BarItem = styled.div<{
  first: boolean;
  last: boolean;
  active?: boolean;
  backgroundColor: ColorOptions;
}>`
  display: block;
  width: calc(100% - 2px);
  height: 12px;
  border-radius: ${(props) =>
    props.first ? "8px 0px 0px 8px" : props.last ? "0px 8px 8px 0px" : "0px"};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};

  ${({ last, backgroundColor }) =>
    !last &&
    css`
      &::after {
        content: "";
        border: inherit;
        position: absolute;
        right: 0px;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 2px solid ${backgroundColor};
      }
    `}

  ${({ first, backgroundColor }) =>
    !first &&
    css`
      &::before {
        content: "";
        border: inherit;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 6px solid ${colors[backgroundColor]};
        border-bottom: 6px solid ${colors[backgroundColor]};
        border-left: 2px solid ${colors.white};
      }
    `}
`;

interface ProgressBarProps {
  currentProgress?: number;
  total?: number;
  completedColor?: ColorOptions;
  incompleteColor?: ColorOptions;
  text?: string | null;
}

/**
 * ProgressBar atom
 *
 * @param {Object} props -
 * @param {Number} [props.currentProgress] - default to 0
 * @param {Number} [props.total] - default to 1
 * @param {String} [props.completedColor] - default to yellow
 * @param {String} [props.incompleteColor] - default to black10
 * @param {Boolean} [props.withText] - default to false
 * @param {String[] | null} [props.text] - text to describe current progress, default to
 *                                  null if no text
 */
export default function ProgressBar(props: ProgressBarProps) {
  const { currentProgress = 0, total = 1 } = props;

  const barWidth = 100 / total;

  return (
    <Root>
      {Array.from(Array(total).keys()).map((_, i) => (
        <Bar key={"bar-item-" + i} width={`${barWidth}%`}>
          <BarItem
            first={i === 0}
            last={i === total - 1}
            backgroundColor={
              currentProgress === total
                ? "statsBlue"
                : i < currentProgress
                ? "green"
                : "black10"
            }
          />
        </Bar>
      ))}
    </Root>
  );
}
