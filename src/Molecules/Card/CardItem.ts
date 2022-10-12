import styled from 'styled-components';
import { isBrowser, isMobile } from 'react-device-detect';

/**
 * @typedef {{
 *   v?: boolean;
 * }} CardItemProps */

/* eslint operator-linebreak: ["off"] */
const CardItem =
  /** @type {import('styled-components').ThemedStyledFunction<'div', CardItemProps>} */
  (styled.div)`
    display: flex;
    margin-right: ${isBrowser && (({ marginRight }) => marginRight || '48px')};
    flex-direction: ${(props) => (props.v || isMobile ? 'column' : 'row')};
    ${(props) => props.compact && 'flex-grow: 0;'}
    width : ${(props) => !props.force && isMobile && '50%'} !important;
    margin-bottom: ${isMobile && '8px'};
  `;

export default CardItem;
