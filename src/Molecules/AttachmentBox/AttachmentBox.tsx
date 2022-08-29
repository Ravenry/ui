import React from 'react';
import styled from 'styled-components';
import link from 'ui/assets/link.svg';
import { Icon, Text, Col, Row, Spacer } from '@ravenry/ui';
import { getIconByFileType, formatFileSize } from 'helper/utils';
import colors, { ColorOptions } from '../../shared/colors';
import { amplitudeEvent } from 'helper/amplitude';

const Root = styled.div<{ width?: string; backgroundColor?: ColorOptions; customMargin?: string }>`
  position: relative;
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  width: ${(props) => props.width || '340px'};
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : null)}
  ${({ customMargin }) => (customMargin ? `margin: ${customMargin};` : null)}
  height: 74px;
  padding: 12px;
  border: 1px solid ${colors.black10};
  border-radius: 10px;
  justify-content: space-between;
  &:hover {
    border: 1px solid ${colors.blue90};
  }
  &:hover > div > p {
    color: ${colors.black};
  }
`;

const NewTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const AttachmentItem = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SVG = styled.img`
  width: 37px;
  height: 50px;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px 4px;
  position: relative;
  border-radius: 6px;
  height: 28px;
  width: fit-content;

  background: none;

  &:hover {
    background: ${colors.black5};
  }

  &:hover > svg {
    fill: ${colors.black};
  }
`;

function deleteMimeType(documentTitle: string, mimeType: string) {
  const title = (documentTitle || '').replace(`${mimeType}`, '');
  return title;
}

export type AttachmentVariants = 'submitWork' | 'requestRevision' | 'attach';

interface Props {
  mimeType: string;
  linkUrl: string;
  title: string;
  tag?: boolean;
  onDelete?: () => void;
  width?: string;
  onClick?: (jobId: string | number, documentId: string | number) => void;
  jobId: string | number;
  documentId: string | number;
  backgroundColor?: ColorOptions;
  variant?: string;
  hideVariant?: boolean;
  fileSize?: AttachmentVariants;
  customMargin?: string;
  /**
   * className is needed to enable overriding style with encapsulation
   */
  className?: string;
}

export default function AttachmentBox(props: Props) {
  const {
    mimeType,
    linkUrl,
    title = '',
    tag,
    onDelete,
    width,
    jobId,
    documentId,
    fileSize = '',
    hideVariant = false,
    className,
  } = props;

  function getFileType(mimetype: string) {
    if (
      [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(mimetype)
    ) {
      return '.doc';
    }

    if (['image/gif'].includes(mimetype)) {
      return '.gif';
    }

    if (['image/jpeg'].includes(mimetype)) {
      return '.jpg';
    }

    if (['image/png'].includes(mimetype)) {
      return '.png';
    }

    if (['application/pdf'].includes(mimetype)) {
      return '.pdf';
    }

    if (
      [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ].includes(mimetype)
    ) {
      return '.ppt';
    }

    if (['application/vnd.rar'].includes(mimetype)) {
      return '.rar';
    }

    if (['image/svg+xml'].includes(mimetype)) {
      return '.svg';
    }

    if (
      [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ].includes(mimetype)
    ) {
      return '.xls';
    }

    if (['application/zip'].includes(mimetype)) {
      return '.zip';
    }

    return '';
  }

  return (
    <Root
      customMargin={props.customMargin}
      backgroundColor={props.backgroundColor}
      width={width}
      onClick={() => {
        if (typeof props.onClick === 'function') {
          props.onClick?.(jobId, documentId);
        }

        if (linkUrl) {
          window.open(/^https?:\/\//.test(linkUrl) ? linkUrl : `https://${linkUrl}`, '_blank');
        }
      }}
      className={className}
    >
      <AttachmentItem>
        <SVG src={mimeType ? getIconByFileType(mimeType) : link} style={{ marginRight: '8px' }} />
        {props.variant !== '' || props.variant !== undefined ? (
          <Col
            style={{
              minWidth: 0,
              flex: '1 1 100%',
              flexWrap: 'nowrap',
            }}
          >
            <Row>
              <Text
                _as="s5"
                color="black80"
                ellipsis
                style={{ maxWidth: '195px', whiteSpace: 'nowrap' }}
              >
                {deleteMimeType(title, getFileType(mimeType))}
              </Text>
            </Row>
            {props.variant && (
              <Row>
                <Text
                  _as="s6"
                  bold
                  size="12px"
                  lineHeight="14px"
                  color="black80"
                  style={{ marginTop: 0 }}
                >
                  {!hideVariant
                    ? props.variant === 'attach'
                      ? 'Attachment'
                      : props.variant === 'submitWork'
                      ? 'Final Work'
                      : null
                    : null}
                </Text>
                {props.variant === 'requestRevision' || props.variant === 'submitJob' ? null : (
                  <>
                    {!hideVariant && <Spacer size={8} />}
                    <Text
                      _as="s6"
                      size="12px"
                      lineHeight="14px"
                      color="black50"
                      style={{ marginTop: 0 }}
                    >
                      {formatFileSize(fileSize)}
                    </Text>
                  </>
                )}
              </Row>
            )}
          </Col>
        ) : (
          <Text _as="s5" color="black80" ellipsis style={{ maxWidth: '80px' }}>
            {title.length > 10 ? `${title.slice(0, 6)}.. ${getFileType(mimeType)}` : title}
          </Text>
        )}
        {(props.variant === '' || props.variant === undefined) && title.length > 10 ? (
          <Text _as="s5" color="black80">
            {getFileType(mimeType)}
          </Text>
        ) : null}
      </AttachmentItem>
      {onDelete && (
        <AttachmentItem>
          <Container
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              amplitudeEvent('deleted attachment');
              onDelete();
            }}
          >
            <Icon name="delete" fill="black60" />
          </Container>
        </AttachmentItem>
      )}

      {tag && (
        <NewTag>
          <div
            style={{
              background: colors.red90,
              padding: '3px 5px',
              borderRadius: '10px 0px',
            }}
          >
            <Text _as="b1" size="10px" lineHeight="12px" letterSpacing="0.3px" bold color="white">
              NEW
            </Text>
          </div>
        </NewTag>
      )}
    </Root>
  );
}
