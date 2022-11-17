import { formatFileSize, getIconByFileType } from 'helper/utils';
import React from 'react';
import styled from 'styled-components';

import { Col, Icon, Text, Row, Spacer } from '@ravenry/ui';
import colors from '../../shared/colors';

/**
 * FilePreview molecule
 *
 * @param {Object} props
 * @param {File} [props.file]
 * @param {String} [props.width] - file preview width, default to 100%
 * @param {String} [props.background] - background color, default to backgroundWhite
 * @param {Function} [props.onDelete] - callback when delete icon is clicked
 */

const Root = styled(Row)`
  padding: 8px;
  border-radius: 5px;
  width: ${({ width }) => width};
  background-color: ${({ background }) =>
    background && colors[background] ? colors[background] : colors.backgroundWhite};
`;

export default function FilePreview(props) {
  const { file, width = '100%', background = 'backgroundWhite', onDelete, style } = props;

  return (
    <Root alignItems="center" noWrap width={width} background={background} style={style}>
      <img src={getIconByFileType(file.type)} alt={file.name} width="26px" height="36px" />
      <Spacer size="8" horizontal display="block" />
      <Col
        style={{
          minWidth: 0,
          flex: '1 1 100%',
          flexWrap: 'nowrap',
        }}
      >
        <Text _as="b2" color="black60" ellipsis fluid title={file.name}>
          {file.name}
        </Text>
        <Text size="10px" lineHeight="16px" color="black60" style={{ marginTop: 0 }}>
          {formatFileSize(file.size)}
        </Text>
      </Col>
      <Spacer size="8" horizontal display="block" />
      <Icon name="x" clickable onClick={onDelete} fill="black" />
    </Root>
  );
}
