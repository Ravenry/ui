import React from 'react';
import styled from 'styled-components';
import { Text, Spacer, Button, Icon, Row } from '@ravenry/ui';

import Responsive from '../../utils/responsive';
import { getIconByFileType } from 'helper/utils';
import colors from '../../shared/colors';
import link from 'ui/assets/link.svg';
import general from 'ui/assets/general.svg';

const MobileContainer = styled.div``;

const Root = styled.div<{ isMobile?: boolean; width?: string }>`
  background-color: ${colors.backgroundLight};
  box-shadow: 0;
  width: ${({ width }) => width || '100%'};
  border-radius: 5px;
  &:hover {
    box-sizing: border-box;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
  }
`;

const Bottom = styled.div`
  padding: 16px;
  /* border: 1px solid ${colors.black10}; */
  border-radius: 0px 0px 10px 10px;
  width: 100%;
`;

const Image = styled.img<{ isMobile?: boolean }>`
  object-fit: cover;
  width: 100%;

  border-radius: 9px 9px 0px 0px;
  top: 0;
  left: 0;
  position: ${({ isMobile }) => !isMobile && 'relative'};
`;

const SVG = styled.img<{ isMobile?: boolean }>`
  /* object-fit: cover; */
  width: 100%;
  padding: 20px;

  border-radius: 9px 9px 0px 0px;
  top: 0;
  left: 0;
  position: ${({ isMobile }) => !isMobile && 'relative'};
`;

const Desc = styled.div`
  width: 100%;
`;

const ElipsisText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;
`;

const Overlay = styled.div<{ isMobile?: boolean }>`
  background-color: ${colors.black40};
  width: 100%;
  height: 100%;
  display: ${({ isMobile }) => isMobile && 'none'};
  border-radius: 9px 9px 0px 0px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  &:hover {
    opacity: 0.8;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayContainer = styled.div<{ isMobile?: boolean }>`
  width: 100%;
  // height: 100%;

  position: ${({ isMobile }) => !isMobile && 'relative'};
`;

function getImage(name: string) {
  const regexPattern = /(?:\.([^.]+))?$/;
  const [, extension] = regexPattern.exec(name);

  if (['jpg', 'jpeg', 'gif', 'png', 'tiff', 'bmp', 'svg'].includes(extension)) return true;

  return false;
}

interface FileCardProps {
  onEdit?: () => void;
  actionText?: any;
  editable?: boolean;
  onDownload: React.MouseEventHandler<HTMLDivElement>;
  onDelete?: () => void;
  mimeType: string;
  img_url: string;
  link_url?: string;
  imgPreview?: any;
  withBottom?: boolean;
  type?: any;
  title?: any;
}

export default function FileCard(props: FileCardProps) {
  const {
    onEdit,
    actionText,
    editable,
    onDownload,
    onDelete,
    mimeType,
    img_url,
    link_url,
    imgPreview,
    withBottom = true,
  } = props;

  const isImg = mimeType ? mimeType.split('/')[0] === 'image' : getImage(img_url);

  const isIconAvailable = getIconByFileType(mimeType);

  const { isMobile } = Responsive();

  return isMobile ? (
    <Root {...props} isMobile={isMobile} onClick={onDownload}>
      <MobileContainer>
        {imgPreview ? (
          <Image isMobile={isMobile} src={imgPreview} height="170px" />
        ) : link_url && link_url !== '' ? (
          <SVG isMobile={isMobile} src={link} height="170px" />
        ) : isImg ? (
          <Image isMobile={isMobile} src={img_url} height="170px" />
        ) : isIconAvailable ? (
          <SVG
            isMobile={isMobile}
            src={isIconAvailable ? getIconByFileType(mimeType) : general}
            height="170px"
          />
        ) : (
          <SVG isMobile={isMobile} src={general} height="170px" />
        )}
      </MobileContainer>

      {withBottom ? (
        <Bottom>
          <Text
            _as="b2"
            color="black40"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            {props.type}
          </Text>
          <Spacer size="8" display="block" />
          <Text _as="b2" style={{ width: 'calc(100% - 16px)' }}>
            <Desc>
              {onDelete ? (
                <Row justifyContent="space-between" alignItems="center">
                  <div style={{ width: '90%' }}>
                    <ElipsisText title={props.title}>{props.title}</ElipsisText>
                  </div>
                  <div style={{ width: '5%' }}>
                    <Icon
                      name="delete"
                      clickable
                      onClick={onDelete}
                      fill="black40"
                      hover
                      hoverFill="black100"
                    />
                  </div>
                  {editable && (
                    <div style={{ width: '5%' }}>
                      <Icon
                        name="edit"
                        clickable
                        onClick={onEdit}
                        fill="black40"
                        hover
                        hoverFill="black100"
                      />
                    </div>
                  )}
                </Row>
              ) : (
                <ElipsisText title={props.title}>{props.title}</ElipsisText>
              )}
            </Desc>
          </Text>
        </Bottom>
      ) : null}
    </Root>
  ) : (
    <Root {...props} isMobile={isMobile}>
      <OverlayContainer isMobile={isMobile}>
        {imgPreview ? (
          <Image isMobile={isMobile} src={imgPreview} height="170px" />
        ) : link_url && link_url !== '' ? (
          <SVG isMobile={isMobile} src={link} height="170px" />
        ) : isImg ? (
          <Image isMobile={isMobile} src={img_url} height="170px" />
        ) : isIconAvailable ? (
          <SVG
            isMobile={isMobile}
            src={isIconAvailable ? getIconByFileType(mimeType) : general}
            height="170px"
          />
        ) : (
          <SVG isMobile={isMobile} src={general} height="170px" />
        )}

        {editable ? (
          <Overlay isMobile={isMobile}>
            <div>
              <Button
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
                  border: '2px solid white',
                  fontWeight: 'bold',
                }}
                onClick={onEdit}
              >
                {actionText || 'Edit'}
              </Button>
            </div>
          </Overlay>
        ) : (
          <Overlay isMobile={isMobile}>
            <div>
              <Button
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
                  border: '2px solid white',
                  fontWeight: 'bold',
                }}
                onClick={onDownload}
              >
                {actionText || 'Download'}
              </Button>
            </div>
          </Overlay>
        )}
      </OverlayContainer>

      {withBottom ? (
        <Bottom>
          <Text
            _as="b2"
            color="black40"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            {props.type}
          </Text>
          <Spacer size="8" display="block" />
          <Text _as="b2" style={{ width: 'calc(100% - 16px)' }}>
            <Desc>
              {onDelete ? (
                <Row justifyContent="space-between" alignItems="center">
                  <div style={{ width: '95%' }}>
                    <ElipsisText title={props.title}>{props.title}</ElipsisText>
                  </div>
                  <div style={{ width: '5%' }}>
                    <Icon
                      name="delete"
                      clickable
                      onClick={onDelete}
                      fill="black40"
                      hover
                      hoverFill="black100"
                    />
                  </div>
                </Row>
              ) : (
                <ElipsisText title={props.title}>{props.title}</ElipsisText>
              )}
            </Desc>
          </Text>
        </Bottom>
      ) : null}
    </Root>
  );
}
