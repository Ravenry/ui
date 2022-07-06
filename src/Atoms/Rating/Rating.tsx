import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const StarContainer = styled.div`
  display: flex;
`;

const StarItem = styled.div<{
  checked?: boolean;
  lastChild?: boolean;
  spacing?: string;
  cursor?: string;
}>`
  color: ${(props) => (props.checked ? colors.yellow : colors.black10)};
  cursor: ${({ cursor }) => cursor || "pointer"};
  ${({ lastChild, spacing }) => (!lastChild ? `margin-right: ${spacing};` : "")}
`;

interface RatingProps {
  onClick?: (starValue: number) => void;
  value?: number;
  total?: number;
  size?: string;
  spacing?: string;
  style?: React.CSSProperties;
}

/**
 * Rating
 *
 * @param {Object} props - component props
 * @param {Number} props.value - the rating, default to 0
 * @param {Function} [props.onClick] - callback when one of the star is clicked
 * @param {number} [props.total] - default to 5
 * @param {String} [props.size] - in pixels, default to 15px
 * @param {String} [props.spacing] - in pixels, default to 8px
 * @param {React.CSSProperties} [props.style] - custom style
 */
export default function Rating(props: RatingProps) {
  const {
    onClick,
    value = 0,
    total = 5,
    size = "15px",
    spacing = "8px",
  } = props;

  const starSvg = (checked: boolean) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9616 5.6698C14.8648 5.3543 14.5947 5.12763 14.2747 5.097L9.94501 4.68654L8.23366 0.505411C8.10744 0.199101 7.81976 0 7.4998 0C7.17984 0 6.89217 0.199101 6.76595 0.505411L5.0546 4.68654L0.724857 5.097C0.407832 5.12763 0.137773 5.35124 0.037969 5.6698C-0.0618353 5.98836 0.0291627 6.33449 0.269867 6.55503L3.54286 9.55075L2.58004 13.9831C2.50959 14.3077 2.62994 14.6477 2.8912 14.8407C3.02916 14.9449 3.19354 15 3.35793 15C3.49883 15 3.63973 14.9602 3.76595 14.8805L7.4998 12.5526L11.2337 14.8805C11.5067 15.0521 11.8501 15.0368 12.1113 14.8407C12.3697 14.6447 12.493 14.3077 12.4225 13.9831L11.4567 9.54768L14.7297 6.55197C14.9675 6.33143 15.0585 5.9853 14.9616 5.6698Z"
        fill={checked ? colors.yellow : colors.black10}
      />
    </svg>
  );

  return (
    <StarContainer {...props} onClick={() => undefined}>
      {new Array(total).fill(0).map((_item, index, { length }) => (
        <StarItem
          key={`star-${index}`}
          checked={value > index + 0.5}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            return onClick ? onClick(index + 1) : undefined;
          }}
          cursor={onClick ? "pointer" : "default"}
          lastChild={index >= length - 1}
          spacing={spacing}
        >
          {starSvg(value > index + 0.5)}
        </StarItem>
      ))}
    </StarContainer>
  );
}
