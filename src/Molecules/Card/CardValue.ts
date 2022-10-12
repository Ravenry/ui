import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import colors from '../../shared/colors';

/**
 * @typedef {{
 *   bold?: boolean;
 * }} CardValueProps */

/* eslint operator-linebreak: ["off"] */
const CardValue =
  /** @type {import('styled-components').ThemedStyledFunction<'div', CardValueProps>} */
  (styled.div)`
    font-size: 0.75rem;
    line-height: 16px;
    ${({ display }) => `
    display: ${display || 'flex'};
    ${['flex', undefined].includes(display) ? 'align-items: center;' : ''}
  `}
    letter-spacing: 0.1px;
    color: ${(props) => (props.color ? colors[props.color] : colors.black)};
    width: ${isMobile && '100%'};
    font-weight: bold;

    ${({ ellipsis }) =>
      ellipsis
        ? `text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;`
        : ''}
  `;

export default CardValue;
