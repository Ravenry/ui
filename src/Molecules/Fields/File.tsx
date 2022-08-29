import React from 'react';
import styled from 'styled-components';
import { A, Col, Text, Row, Button, Icon, Spacer } from '@ravenry/ui';

import { ErrorText } from './Shared';

import doc from 'ui/assets/DOC.svg';
import gif from 'ui/assets/GIF.svg';
import jpg from 'ui/assets/JPG.svg';
import pdf from 'ui/assets/PDF.svg';
import ppt from 'ui/assets/PPT.svg';
import rar from 'ui/assets/RAR.svg';
import svg from 'ui/assets/SVG.svg';
import xls from 'ui/assets/XLS.svg';
import zip from 'ui/assets/ZIP.svg';

const KILO = 1024;
const MEGA = KILO * 1024;

const FileIcon = styled.img`
  margin-right: 16px;
`;

/**
 * getIcon
 *
 * @param {String} name
 */
function getIcon(name: any) {
  const regexPattern = /(?:\.([^.]+))?$/;
  const [, extension] = regexPattern.exec(name);

  if (['doc', 'docx'].includes(extension)) {
    return doc;
  }

  if (['gif'].includes(extension)) {
    return gif;
  }

  if (['jpg', 'jpeg'].includes(extension)) {
    return jpg;
  }

  if (['pdf'].includes(extension)) {
    return pdf;
  }

  if (['ppt', 'pptx'].includes(extension)) {
    return ppt;
  }

  if (['rar'].includes(extension)) {
    return rar;
  }

  if (['svg'].includes(extension)) {
    return svg;
  }

  if (['xls', 'xlsx'].includes(extension)) {
    return xls;
  }

  if (['zip'].includes(extension)) {
    return zip;
  }

  return doc;
}

/**
 * File
 *
 * @param {Object} props
 * @param {Function} props.onChange - callback onChange
 * @param {Function} [props.onReset] - callback onReset
 * @param {String} props.placeholder - text in upload button
 * @param {File | null} [props.value] - file object to be uploaded
 * @param {React.CSSProperties} [props.style] - custom style
 * @param {String} [props.icon] - icon, optional, default to upload
 * @param {String} [props.iconSpacing] - icon spacing
 * @param {String} [props.buttonPadding] - custom button spacing
 * @param {String} [props.color] - button color, optional, default to purple100
 * @param {'outlined'|'contained'|'text'} [props.variant] - button variant, optional, default to contained
 */
function File(props: any) {
  const {
    onChange,
    onReset,
    placeholder,
    value,
    icon,
    color = 'purple',
    disabled,
    style,
    variant = 'contained',
    iconSpacing,
    buttonPadding,
    error,
  } = props;
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const src = getIcon(value?.name);

  const size =
    value?.size >= MEGA
      ? `${(value?.size / MEGA)?.toFixed(2)} MB`
      : value?.size >= KILO
      ? `${(value?.size / KILO)?.toFixed(2)} KB`
      : `${value?.size?.toFixed(2)} B`;

  return value ? (
    <Row alignItems="flex-end" style={style}>
      <FileIcon src={src} alt="uploaded file" />
      <Col>
        <Row>
          {value?.url ? (
            <A href={value.url} target="_blank">
              <Text _as="b2">{value?.name}</Text>
            </A>
          ) : (
            <Text _as="b2">{value?.name}</Text>
          )}
          <Icon name="x" style={{ marginLeft: '20px' }} clickable onClick={onReset} />
        </Row>
        {value?.size ? <Text size="10px">{size}</Text> : <Spacer size="32" display="block" />}
      </Col>
    </Row>
  ) : (
    <>
      <Button
        onClick={handleClick}
        color={color}
        type="button"
        iconSpacing={iconSpacing}
        startIcon={icon || 'upload'}
        disabled={disabled}
        variant={variant}
        style={style}
        padding={buttonPadding}
      >
        {placeholder}
      </Button>
      <input type="file" ref={hiddenFileInput} onChange={onChange} style={{ display: 'none' }} />
      <Spacer size="4" display="block" />
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}
export default File;
