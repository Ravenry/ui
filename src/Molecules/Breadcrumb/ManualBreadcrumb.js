import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Text, Row, Spacer } from '@ravenry/ui';

import colors from '../../utils/colors';

const Root = styled(Row)``;

const BackContainer = styled(Row)`
  cursor: pointer;
  &:hover {
    svg {
      fill: ${colors.black100};
    }
    .p {
      color: ${colors.black100};
    }
  }
`;

const StyledText = styled(Text)`
  &:hover {
    color: ${colors.black};
    text-decoration: underline;
  }

  ${({ onClick }) => (onClick ? 'cursor: pointer;' : null)}
`;

/**
 * ManualBreadcrumb
 *
 * @param {Object} props
 * @param {Function} props.onBack
 * @param {Object[]} props.contents
 * @param {String} [props.contents[].link] - link
 * @param {String} props.contents[].text
 * @param {Boolean} [props.contents[].active]
 * @param {Function} [props.contents[].onClick]
 * @param {React.CSSProperties} [props.style]
 * @param {Function} [props.onClick]
 */
export default function ManualBreadcrumb(props) {
  const { onBack, contents, style } = props;

  return (
    <Root style={style}>
      <BackContainer alignItems="center" onClick={onBack}>
        <Icon name="chevron left" fill="black60" hoverFill="black100" />
        <Text _as="b3" color="black60" bold clickable hoverColor="black100">
          Back
        </Text>
        <Spacer size="16" horizontal />
        <Text size="2" color="black50" bold>
          |
        </Text>
        <Spacer size="16" horizontal />
      </BackContainer>

      <Row alignItems="center">
        {contents.map((content, index, { length }) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            {content.link ? (
              <StyledText _as="b3" uppercase underlineOnHover color="black60">
                <Link to={content.link} style={{ color: 'inherit' }}>
                  {content.text}
                </Link>
              </StyledText>
            ) : (
              <StyledText
                _as="b3"
                uppercase
                underlineOnHover
                color={content.active ? 'black' : 'black60'}
                bold={content.active}
                onClick={content.onClick}
              >
                {content.text}
              </StyledText>
            )}

            {index < length - 1 ? (
              <>
                <Spacer size="8" horizontal />
                <Icon name="chevron right" fill="black50" />
                <Spacer size="8" horizontal />
              </>
            ) : null}
          </React.Fragment>
        ))}
      </Row>
    </Root>
  );
}
