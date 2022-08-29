import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { Text, Spacer, Button, Row, Col, Rating } from '@ravenry/ui';
import { AttachmentBox } from 'ui/molecules';
import colors from '../../shared/colors';
import { useSelector } from 'react-redux';

const TimeStamps = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: space-between;
  align-items: center;
`;

const Bubble = styled.div`
  background-color: ${({ isOutgoing }) =>
    isOutgoing ? colors.backgroundDark : colors.backgroundWhite};
  color: ${colors.black};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: ${({ isOutgoing }) => (isOutgoing ? '10px 0px 10px 10px' : '0px 10px 10px 10px')};
  padding: 8px 16px;
  word-break: break-word;
  max-width: ${({ isMobile }) => (isMobile ? 'calc(100% - 64px)' : '450px')};
  min-width: 200px;
`;

const OfferBox = styled(Row)`
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  width: ${({ width }) => width || '293px'};
  height: ${({ height }) => height || '66px'};
  cursor: pointer;
  padding: 12px;
  border-radius: 10px;
`;

const RatingBox = styled.div`
  width: ${({ width }) => width || '293px'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  border: 1px solid ${colors.black10};
  padding: 12px;
  border-radius: 10px;
  box-sizing: 'border-box';
`;
/*
variant:
not using attachment
-sendOffer
-updateOffer
-reviewed
using attachment
-submitJob
-submitWork
-requestRevision
-attach
*/

export default function BubbleChat(props) {
  const {
    from,
    me,
    isMobile,
    fromName,
    createdAt,
    attachments,
    message,
    variant = 'attach',
    review,
    offer,
    onViewOfferAndContract,
    jobStatus,
    isCancelled,
  } = props;
  const global = useSelector((state) => state.global);

  return (
    <Bubble isOutgoing={from === me} isMobile={isMobile}>
      <TimeStamps>
        <div>
          <Text _as="b3" bold color="black60">
            {from === me ? 'You' : fromName}
          </Text>
        </div>
        <Spacer size={24} />
        <div>
          <Text _as="sm2" color="black60">
            {moment(createdAt).format('h:mm A')}
          </Text>
        </div>
      </TimeStamps>
      {attachments?.map((attachment, i) => (
        <>
          <React.Fragment key={`attachment-${i}`}>
            <AttachmentBox
              mimeType={attachment?.mimetype || ''}
              linkUrl={attachment?.url || ''}
              title={attachment?.name || ''}
              backgroundColor="white"
              variant={variant}
              fileSize={attachment?.size || ''}
              width="100%"
            />
            {variant === 'requestRevision' ? (
              <>
                <Spacer display="flex" size={8} />
                <Button
                  color="blue"
                  textColor="blue"
                  variant="outlined"
                  width="293px"
                  disabled={isCancelled}
                >
                  Request revision
                </Button>
              </>
            ) : null}
          </React.Fragment>
          {message !== undefined && message !== '' && <Spacer display="flex" size={8} />}
        </>
      ))}
      {variant === 'sendOffer' || variant === 'updateOffer' ? (
        <OfferBox alignItems="center" noWrap>
          <Spacer size="8" horizontal display="block" />
          <Col
            style={{
              minWidth: 0,
              flex: '1 1 100%',
              flexWrap: 'nowrap',
            }}
          >
            <Text _as="b3" lineHeight="16px" color="black80" ellipsis fluid>
              OFFER
            </Text>
            <Text _as="s2" bold lineHeight="26px" color="black100" style={{ marginTop: 0 }}>
              {(offer?.offerCurrency || 'USD').toUpperCase()} {offer?.offerValue || ''}
            </Text>
          </Col>
          <Col>
            <Button
              color="blue"
              variant={
                (global.user.domain === 'client' && jobStatus >= 2) ||
                (global.user.domain === 'freelancer' && jobStatus >= 4)
                  ? 'outlined'
                  : 'contained'
              }
              width="130px"
              bold
              onClick={() =>
                onViewOfferAndContract({
                  offer: offer.offerValue,
                  offerCurrency: offer.offerCurrency || 'USD',
                  deadline: offer.jobDeadline,
                  scope: offer.scopeOfWork,
                  freelancerId: from,
                })
              }
              disabled={isCancelled}
            >
              {(global.user.domain === 'client' && jobStatus >= 2) ||
              (global.user.domain === 'freelancer' && jobStatus >= 4)
                ? 'View contract'
                : 'View quote'}
            </Button>
          </Col>
        </OfferBox>
      ) : (
        variant === 'reviewed' && (
          <>
            <Text _as="b3" bold>
              {review?.title || ''}
            </Text>
            <Spacer display="flex" size={8} />
            <RatingBox>
              <Rating value={review?.star || 0} />
              <Text _as="b3">{review?.message || ''}</Text>
            </RatingBox>
          </>
        )
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(message),
        }}
        style={{
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.5px',
          color: 'black100',
        }}
      />
    </Bubble>
  );
}
