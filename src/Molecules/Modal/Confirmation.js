import React from 'react';
import Responsive from 'helper/responsive';

import { Col, Text, Row, Spacer, Button, Modal } from '@ravenry/ui';

/**
 * ConfirmationModal
 *
 * @param {Object} props
 * @param {Boolean} props.open - flag to open modal
 * @param {{src: String, alt: String}} [props.img] - data of image
 * @param {String} props.title - title of modal
 * @param {Object} [props.titleOptions] - options for title
 * @param {String} [props.titleOptions.color] -
 * @param {String | String[]} props.subtitle - copy of modal subtitle
 * @param {Object} [props.subtitleOptions] - options for subtitle
 * @param {String} [props.subtitleOptions.color] -
 * @param {Object} props.primary -
 * @param {String} props.primary.color
 * @param {Function} props.primary.onClick
 * @param {String} props.primary.text
 * @param {Object} [props.ghost] -
 * @param {String} props.ghost.color
 * @param {Function} props.ghost.onClick
 * @param {String} props.ghost.text
 * @param {string | number} [props.ghost.padding]
 * @param {String} [props.name] - name of the modal
 * @param {Function} [props.onPrimaryClick] - function to handle click on primary button
 * @param {Function} [props.onGhostClick] - function to handle click on ghost button
 * @param {Object} props.subtitleOptions
 */
export default function ConfirmationModal(props) {
  const { open, img, title, subtitle, primary, ghost, titleOptions, subtitleOptions } = props;

  const { src, alt } = img;

  // convert string parameter to array of strings to acommodate multiple line text
  const subtitles = [].concat(subtitle || []);
  const { isMobile } = Responsive();

  return (
    <Modal open={open} width={isMobile ? '100%' : '480px'}>
      <Col alignItems="center">
        <img src={src} alt={alt} style={{ width: '200px', heigth: '100px' }} />
        <Spacer size="24" />
        <Text _as="s3" bold color={titleOptions?.color || 'black'}>
          {title}
        </Text>
        <Spacer size="16" />
        {subtitles.map((subtitle, index) => (
          <Text
            key={'text-sub-' + index}
            _as="b2"
            color={subtitleOptions?.color || 'black40'}
            textAlign="center"
          >
            {subtitle}
          </Text>
        ))}
        <Spacer size="24" />
        <Row justifyContent="center" style={{ width: '100%' }}>
          {ghost && (
            <>
              <Button
                onClick={(e) => ghost.onClick(e)}
                color={ghost.color}
                width="150px"
                variant="outlined"
                padding={ghost.padding}
              >
                {ghost.text}
              </Button>
              <Spacer size="16" display="block" />
            </>
          )}
          <Button width="150px" onClick={(e) => primary.onClick(e)} color={primary.color}>
            {primary.text}
          </Button>
        </Row>
      </Col>
      {props.children}
    </Modal>
  );
}
