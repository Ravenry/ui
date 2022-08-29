import Responsive from 'helper/responsive';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Icon, Text } from '../../Atoms';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;

const ScrollableCardContainer = styled.div`
  width: 100%;
  margin-bottom: -8px;
  box-sizing: content-box;
  overflow: auto;
  display: flex;
  align-items: start;
  scroll-behavior: smooth;
  /* flex-direction: ${(props) => props.isMobile && 'column'}; */
`;

const Card = styled.div`
  width: ${(props) => (props.isMobile ? 'calc(100% - 75px)' : 'calc((100% - 180px) / 3)')};
  height: 184px;
  background: #ffffff;
  padding: 16px 24px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  ${({ start }) => (start === 'true' ? '' : 'margin-left: 17px;')}
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 184px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowContainer = styled.button`
  background-color: transparent;
  border: 0px;
  width: 20px;
  padding: 0px;
`;

/**
 * Carousel
 *
 * @param {Object} props - React props
 * @param {Number} props.id - carousel id
 * @param {Number} props.items - items of the carousel
 * @param {Number} props.empty - placeholder when there are no items
 */
export default function Carousel({ id, items, empty }) {
  const [scrollElement, setScrollElement] = useState({});
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);

  useEffect(() => {
    const el = document.getElementById(`carousel-${id || ''}`);
    setScrollElement(el);
    if (el.scrollLeft === 0) setShowScrollLeft(false);
    if (el.scrollLeft === scrollElement.scrollWidth - scrollElement.clientWidth)
      setShowScrollRight(false);
  }, []);

  const getScrollWidth = (el) => el.scrollWidth - el.clientWidth;

  const getScrollToPosition = (direction) => {
    if (direction === 'right') {
      const card = document.querySelector('.carousel-card');
      const scrollLength = Math.ceil(scrollElement.scrollLeft + (card.clientWidth * 2 + 34));
      const scrollWidth = getScrollWidth(scrollElement);

      const remainingScrolLength = scrollWidth - scrollLength;
      return remainingScrolLength > 0 ? scrollLength : scrollWidth;
    }
    if (direction === 'left') {
      const card = document.querySelector('.carousel-card');
      const scrollLength = Math.ceil(scrollElement.scrollLeft - (card.clientWidth * 2 + 34));

      return scrollLength > 0 ? scrollLength : 0;
    }
  };

  const scrollRight = () => {
    const scrollTo = getScrollToPosition('right');
    scrollElement.scroll(scrollTo, 0);
    if (!showScrollLeft) setShowScrollLeft(true);
    if (scrollTo === getScrollWidth(scrollElement)) setShowScrollRight(false);
  };

  const scrollLeft = () => {
    const scrollTo = getScrollToPosition('left');
    scrollElement.scroll(scrollTo, 0);

    if (scrollTo === 0) setShowScrollLeft(false);
    if (!showScrollRight) setShowScrollRight(true);
  };

  const { isMobile } = Responsive();

  return (
    <Root>
      <ArrowContainer title="leftSlider">
        {showScrollLeft && <Icon name="chevron left" fill="black40" onClick={scrollLeft} />}
      </ArrowContainer>

      <CardContainer>
        <ScrollableCardContainer isMobile={isMobile} id={`carousel-${id ? 'id' : ''}`}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Card
                isMobile={isMobile}
                key={`${id}-${index}`}
                className="carousel-card"
                start={index === 0 ? 'true' : 'false'}
              >
                {item}
              </Card>
            ))
          ) : (
            <EmptyContainer>
              <Text _as="b2">{empty}</Text>
            </EmptyContainer>
          )}
        </ScrollableCardContainer>
      </CardContainer>
      <ArrowContainer title="rightSlider">
        {showScrollRight && <Icon name="chevron right" fill="black40" onClick={scrollRight} />}
      </ArrowContainer>
    </Root>
  );
}
