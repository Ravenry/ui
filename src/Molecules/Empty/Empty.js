import React from 'react';

import { Text, Row, Col, Spacer } from '@ravenry/ui';

import empty_illustration from 'ui/assets/empty_illustration.svg';
import empty_illustration_treasure from 'ui/assets/empty_illustration_treasure.svg';
import empty_illustration_island from 'ui/assets/empty_illustration_island.svg';

/**
 * Empty is a component that shows if the panel has no content/resource
 *
 * @param {Object} props - props of the component
 * @param {React.ReactNode | String} [props.text] - text, default to empty
 * @param {String} [props.imgWidth] -
 * @param {String} [props.imgHeight] -
 * @param {String | Number} [props.imgTextSpace] - spacing between image and text, must be numeric without pixel, default to 24
 * @param {"desert" | "treasure" | "island"} [props.img] - image to show, default to desert
 * @param {*} [props.action] - action element passed to this component
 */
export default function Empty(props) {
  const {
    text = 'Empty',
    style,
    imgWidth,
    imgHeight,
    imgTextSpace = '24',
    img = 'desert',
    action,
  } = props;

  const illustrations = {
    desert: empty_illustration,
    island: empty_illustration_island,
    treasure: empty_illustration_treasure,
  };

  const illustration = illustrations[img];

  return (
    <Col style={style} data-cy={props['data-cy']}>
      <Row>
        <img
          src={illustration}
          alt="there is nothing here"
          width={imgWidth}
          height={imgHeight}
          style={{ margin: 'auto', maxWidth: '100%' }}
        />
      </Row>
      <Spacer size={imgTextSpace} />

      {typeof text === 'string' ? (
        <Row justifyContent="center">
          <Text _as="s5" color="black60" textAlign="center" isHtml>
            {text}
          </Text>
        </Row>
      ) : (
        text
      )}

      {action ? (
        <>
          <Spacer size={16} display="block" />
          <Row justifyContent="center">{action}</Row>
        </>
      ) : null}
    </Col>
  );
}
