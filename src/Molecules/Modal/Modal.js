import styled, { css } from 'styled-components';

import React from 'react';
import { Segment, Icon, Spacer } from '@ravenry/ui';
import colors from 'ui/colors';
import Responsive from 'helper/responsive';

const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const MobileContent = styled.div`
  max-height: 100vh;
  overflow: auto;
  padding: 24px;
  width: 100%;
`;
const ModalContainer = styled.div`
  ${({ isMobile }) =>
    isMobile
      ? css`
          z-index: 100; /* Sit on top */

          display: ${(props) => (props.open ? 'flex' : 'none')}; /* Hidden by default */
          position: fixed; /* Stay in place */
          left: 0;
          top: 0;

          background-color: #ffffff;
        `
      : css`
          /* padding: 40px;s */
          display: ${(props) => (props.open ? 'flex' : 'none')}; /* Hidden by default */
          position: fixed; /* Stay in place */
          align-content: center;
          align-items: center;
          justify-content: space-around;
          z-index: 100; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(231, 234, 240); /* Fallback color */
          background-color: rgb(231, 234, 240, 0.7);
        `}
`;

const Container = styled.div`
  width: ${({ width }) => width || '800px'};
  padding: ${({ padding }) => padding || '24px'};
`;

const ModalHeader = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const CloseModal = styled.div`
  cursor: pointer;
`;

const Title = styled.div`
  min-width: 300px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Subtitle = styled.div`
  font-size: 0.75rem;
  line-height: 16px;
  text-align: left;
  color: ${colors.black20};
  padding: 8px 0px;
  text-align: left;
`;

const ModalTitle = styled.div`
  font-size: 1.125rem;
  color: ${colors.black};
  font-weight: bold;
  /* padding: 0px 32px; */
  text-align: center;
  padding: 8px 0px;
  text-align: center;
`;

const ModalSubtitle = styled.div`
  font-size: 0.75rem;
  line-height: 16px;
  text-align: left;
  color: ${colors.black20};
  padding: 8px 0px 16px 0px;
  text-align: center;
`;

const ModalFooter = styled.div`
  padding-top: 16px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ModalIcon = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
`;

const ModalSpanBlue = styled.span`
  color: ${colors.blue};
`;

const ModalSpacer = styled.span`
  display: block;
  height: 40px;
  width: 16px;
`;

const ModalBody = styled.div`
  margin-top: 20px;
`;

/**
 * Modal
 *
 * @param {Object} props - component props
 * @param {Boolean} props.open - flag to open the modal
 * @param {String} [props.header] - modal header
 * @param {String} [props.width] - modal width if any
 * @param {String} [props.padding] - custom modal padding
 * @param {String} [props.outerPadding] - custom outer padding
 * @param {React.ReactNode} [props.children]
 */
export default function Modal(props) {
  const { width, padding, outerPadding = '20px' } = props;
  const { isMobile } = Responsive();
  return props.open ? (
    <ModalContainer open={props.open} isMobile={isMobile}>
      {isMobile ? (
        <ContainerMobile>
          <ModalHeader>
            <Title>{props.header ? props.header : ' '}</Title>
            {props.onHide ? (
              <CloseModal onClick={props.onHide}>
                <Icon name="x" fill="#000000" />
              </CloseModal>
            ) : (
              <></>
            )}
          </ModalHeader>
          {props.subheader && <Subtitle>{props.subheader}</Subtitle>}
          <MobileContent>{props.children}</MobileContent>
          <Spacer display="block" size="24" />
        </ContainerMobile>
      ) : (
        <Segment padding={outerPadding}>
          <Container width={width} padding={padding}>
            <ModalHeader>
              <Title>{props.header ? props.header : ' '}</Title>
              {props.onHide ? (
                <CloseModal onClick={props.onHide}>
                  <Icon name="x" fill="#000000" />
                </CloseModal>
              ) : (
                <></>
              )}
            </ModalHeader>
            {props.subheader && <Subtitle>{props.subheader}</Subtitle>}
            {props.children}
          </Container>
        </Segment>
      )}
    </ModalContainer>
  ) : null;
}

Modal.Title = ModalTitle;
Modal.Icon = ModalIcon;
Modal.Subtitle = ModalSubtitle;
Modal.Footer = ModalFooter;
Modal.SpanBlue = ModalSpanBlue;
Modal.Spacer = ModalSpacer;
Modal.Body = ModalBody;
