import React from 'react';
import styled from 'styled-components';

import { Container, Text } from '../../Atoms';
import { IconButton } from '../index';
import colors, { ColorOptions } from '../../shared/colors';
import getElevation from '../../shared/elevations';

// Default images
import DocIllustration from 'ui/assets/DOC.svg';
import PdfIllustration from 'ui/assets/PDF.svg';
import PptIllustration from 'ui/assets/PPT.svg';
import XlsIllustration from 'ui/assets/XLS.svg';
import OtherIllustration from 'ui/assets/general.svg';

interface RootProps {
  // to set the width and height of the thumbnail, default is 162px
  containerSize?: string;
  // to set the rounded border of the thumbnail, default is 10px
  borderRadius?: string;
  // to set the rounded border of the thumbnail, default is 10px
  border?: string;
  // give box shadow to the thumbnail container
  elevation?: number;
  // onClick
  onClick?: Function;
}

interface ImageProps {
  // set true to make image size to match the thumbnail size, won't affect if mimeType is not an image
  fitCover?: boolean;
  // customizable width of the image, can't customize the width if fitCover is true, or if mimeType is not an image
  width?: string;
  // customizable height of the image, can't customize the height if fitCoveris true, or if mimeType is not an image
  height?: string;
  // customizable object fit of the image
  objectFit?: string;
}

interface BadgeProps {
  // the text of the badge on the top right of the thumbnail
  badge?: string;
  // the background color of the badge
  badgeColor?: ColorOptions;
}

interface IconProps {
  // the name of the icon in the top right of the thumbnail
  icon?: string;
  // the text of the tooltip above the icon, default value is empty string, so it is important to fill it if you enable the icon
  iconTooltipText?: string;
  // the function that will be triggered when clicking the icon
  iconOnClick?: (e: any) => void;
}

interface GeneralProps {
  // src of the image, won't be displayed if mimeType is not an image
  src: string;
  // mimeType of the file, can use mimeType="image" or similar image mime types to show src as the displayed image
  mimeType?: string;
}

const Root = styled(Container)<RootProps>`
  box-sizing: border-box;
  border: ${({ border }) => border || `1px solid ${colors.black10}`};
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  width: ${({ containerSize }) => containerSize || '162px'};
  height: ${({ containerSize }) => containerSize || '162px'};
  position: relative;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  ${({ elevation }) => (elevation ? getElevation(elevation) : '')};
  background: ${colors.backgroundWhite};
`;

const ImageContainer = styled(Container)<RootProps>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  overflow: hidden;
`;

const Image = styled.img<ImageProps>`
  object-fit: ${({ fitCover, objectFit }) =>
    fitCover ? 'cover' : objectFit ? objectFit : 'unset'};
  width: ${({ fitCover, width }) => (fitCover ? '100%' : width || 'unset')};
  height: ${({ fitCover, height }) => (fitCover ? '100%' : height || 'unset')};
`;

const Badge = styled.div<BadgeProps>`
  position: absolute;
  top: -1px;
  right: -1px;
  height: 22px;
  padding: 4px 12px;
  border-radius: 0px 10px;
  background-color: ${({ badgeColor }) =>
    badgeColor ? colors[badgeColor as ColorOptions] : colors.blue};
`;

const IconContainer = styled.div<IconProps>`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default function Thumbnail({
  containerSize = '162px',
  elevation = 0,
  badgeColor = 'blue',
  badge,
  icon,
  iconTooltipText,
  iconOnClick,
  src,
  fitCover = false,
  borderRadius,
  border,
  width,
  height,
  mimeType = 'other',
  objectFit,
  onClick,
}: RootProps & ImageProps & BadgeProps & IconProps & GeneralProps) {
  const getDefaultImageUrl = (type: string) => {
    // DOC mime types
    const isDoc = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      'application/vnd.ms-word.document.macroEnabled.12',
      'application/vnd.ms-word.template.macroEnabled.12',
    ].includes(type);
    if (isDoc) return DocIllustration;

    // PDF mime type
    if (type === 'application/pdf') return PdfIllustration;

    // XLS mime types
    const isXls = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      'application/vnd.ms-excel.sheet.macroEnabled.12',
      'application/vnd.ms-excel.template.macroEnabled.12',
      'application/vnd.ms-excel.addin.macroEnabled.12',
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    ].includes(type);
    if (isXls) return XlsIllustration;

    // PPT mime types
    const isPpt = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.presentationml.template',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      'application/vnd.ms-powerpoint.template.macroEnabled.12',
      'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
    ].includes(type);
    if (isPpt) return PptIllustration;

    // Other mime types
    return OtherIllustration;
  };

  const isImage = mimeType.includes('image');

  const downloadThumbnail = (url: string) => {
    if (onClick) {
      onClick();
    }
    window.open(url, '_blank')?.focus();
  };

  return (
    <Root
      containerSize={containerSize}
      elevation={elevation}
      borderRadius={borderRadius}
      border={border}
      onClick={() => downloadThumbnail(src)}
    >
      {badge && (
        <Badge badgeColor={badgeColor}>
          <Text _as="s6" bold color="backgroundWhite">
            {badge}
          </Text>
        </Badge>
      )}
      <ImageContainer alignItems="center" justifyContent="center" flex borderRadius={borderRadius}>
        <Image
          src={!isImage ? getDefaultImageUrl(mimeType) : src}
          fitCover={isImage && fitCover}
          width={!isImage ? '150px' : width}
          height={!isImage ? '110px' : height}
          objectFit={objectFit}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = !isImage ? getDefaultImageUrl(mimeType) : (src as string);
          }}
        />
      </ImageContainer>
      {icon && (
        <IconContainer>
          <IconButton
            color="black"
            name={icon}
            tooltipOptions={{
              position: 'top',
              content: iconTooltipText || '',
              arrowPosition: 'bottom',
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              iconOnClick();
            }}
          />
        </IconContainer>
      )}
    </Root>
  );
}
