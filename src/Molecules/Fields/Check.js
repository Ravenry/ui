import React from 'react';
import styled from 'styled-components';
import { Label, Input } from '@ravenry/ui';

import colors from '../../shared/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  &:hover > div > div > svg > rect:first-child {
    stroke: ${colors.blue};
  }

  &:hover > label {
    color: ${colors.black100};
  }
`;

/**
 * Select molecule
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.id]
 * @param {string} props.name
 * @param {boolean} [props.checked]
 * @param {string} [props.htmlFor]
 * @param {Function} [props.onChange]
 */
const Check = ({ children, htmlFor, ...props }) => (
  <Container
    inline={props.inline}
    style={props.style}
    data-cy={
      typeof props['data-cy'] === 'string'
        ? 'cta-checkbox-' + props['data-cy'].replace(/\s/g, '-').toLowerCase()
        : ''
    }
  >
    <Input.Check {...props} />
    {children && (
      <Label
        htmlFor={htmlFor}
        _as="s5"
        color="black60"
        bhoverColor="black100"
        inline
        onClick={props.onChange}
        style={{ marginLeft: '10px', cursor: 'pointer' }}
      >
        {children}
      </Label>
    )}
  </Container>
);

export default Check;
