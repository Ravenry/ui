import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const Root = styled.div<{ width: string }>`
  position: relative;
  background-color: ${colors.black5};
  height: 8px;
  border-radius: 5px;
  width: ${({ width }) => width};
`;

const FilledBar = styled.div<{ width: string }>`
  position: absolute;
  background-color: ${colors.yellow};
  height: 8px;
  border-radius: 5px;
  width: ${({ width }) => width};
`;

interface RatingBarProps {
  width?: string;
  value?: number;
  total?: number;
}

/**
 * RatingBar
 *
 * @param {Object} props
 * @param {String} props.width - default to 200px
 * @param {Number} props.value - numerator, default to 0
 * @param {Number} props.total - denominator, default to 1
 */
export default function RatingBar(props: RatingBarProps) {
  const { width = "200px", value = 0, total = 1 } = props;

  return (
    <Root width={width}>
      <FilledBar width={`${(value / total) * 100}%`} />
    </Root>
  );
}
