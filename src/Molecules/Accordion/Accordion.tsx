import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Divider, Icon, Row, Spacer } from "../../Atoms";
import colors, { ColorOptions } from "../../shared/colors";
import { withProps } from "../../shared/withProps";

const getChevronDirection = (
  open: boolean,
  options = { open: "up", closed: "down" }
) => (open ? options.open : options.closed);

const Root = styled.div``;

export interface HeaderProps {
  bold: boolean;
  headerHeight: string;
  headerPadding: string;
  headerBackground: ColorOptions;
  headerBorderRadius: string;
  noHover: boolean;
  headerHoverBackground: ColorOptions;
}

const Header = withProps<HeaderProps>()(styled(Row))`
  cursor: pointer;

  ${({ headerHeight }) => (headerHeight ? `height: ${headerHeight};` : "")}
  ${({ headerPadding }) => (headerPadding ? `padding: ${headerPadding};` : "")}
  ${({ headerBackground }) =>
    headerBackground && colors[headerBackground]
      ? `background: ${colors[headerBackground]};`
      : ""}
  ${({ headerBorderRadius }) =>
    headerBorderRadius ? `border-radius: ${headerBorderRadius};` : ""}
  
  ${({ noHover }) =>
    noHover
      ? ""
      : `
        &:hover,
        &:hover > p {
          color: ${colors.lightBlue};
        }
        &:hover > svg {
          fill: ${colors.lightBlue};
        }
  `}

  ${({ headerHoverBackground }) =>
    colors[headerHoverBackground]
      ? `
    &:hover {
      background: ${colors[headerHoverBackground]}
    }
  `
      : ""}
`;

export interface ContentProps {
  height: any;
  opacity: any;
  overflow: any;
  contentOverflow: any;
  ref: any;
}

const Content = withProps<ContentProps>()(styled.div)`
  height: ${({ height }) => height}px;
  opacity: ${({ height }) => (height > 0 ? 1 : 0)};
  overflow: ${({ contentOverflow, height }) =>
    contentOverflow && height !== 0 ? contentOverflow : "hidden"};
  /*  transition: all 0.4s ease-in-out;
  */
  transition: 0.5s;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  height: 32px;
  width: 32px;

  background: none;

  &:hover {
    background: ${colors.black5};
  }

  &:hover > svg {
    fill: ${colors.black};
  }
`;

export interface AccordionProps {
  title?: any;
  content?: any;
  defaultOpen?: boolean;
  chevronColor?: ColorOptions;
  chevronHoverColor?: ColorOptions;
  chevronDirectionOptions?: any;
  chevronOnRight?: boolean;
  noHover?: boolean;
  headerHeight?: any;
  headerPadding?: any;
  headerBackground?: any;
  headerHoverBackground?: any;
  headerBorderRadius?: any;
  contentOverflow?: string;
  onClickHeader?: any;
  autoClosed?: any;
  divider?: boolean;
  offsetDivider?: string;
  marginTop?: string;
  chevronContainerHover?: boolean;
  disableClickTarget?: any;
  disableContentChange?: boolean;
  contentArrayLength?: number;
  contentHeight?: any;
}

export default function Accordion(props: AccordionProps) {
  const {
    title,
    content,
    defaultOpen,
    chevronColor,
    chevronHoverColor,
    chevronDirectionOptions = { open: "up", closed: "down" },
    chevronOnRight = true,
    noHover = false,
    headerHeight,
    headerPadding,
    headerBackground,
    headerHoverBackground,
    headerBorderRadius,
    contentOverflow,
    onClickHeader,
    autoClosed,
    divider,
    offsetDivider = "0",
    marginTop = "20px",
    chevronContainerHover = false,
    disableClickTarget,
    disableContentChange = false,
    contentArrayLength = 0,
    contentHeight,
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(!!defaultOpen);
  const [height, setHeight] = useState(0);
  const [fixedContentHeight, setFixedContentHeight] = useState(0);
  const finalHeight = contentHeight || height;

  const chevronDirection = getChevronDirection(open, {
    open: chevronDirectionOptions.open,
    closed: chevronDirectionOptions.closed,
  });

  const toggleAccordion = () => {
    setHeight(!open ? fixedContentHeight : 0);
    setOpen(!open);
  };

  useEffect(() => {
    if (
      !disableContentChange &&
      ref.current &&
      typeof onClickHeader !== "function" &&
      defaultOpen
    ) {
      setHeight(defaultOpen ? ref.current.scrollHeight : 0);
    }
  }, [content, onClickHeader]);

  useEffect(() => {

    // @TODO Typescript errot around ref props
    setHeight(defaultOpen ? ref.current.scrollHeight : 0);
    setFixedContentHeight(ref.current.scrollHeight);
  }, []);


  useEffect(() => {
    if (!defaultOpen && ref.current && open) {
      setFixedContentHeight(ref.current.scrollHeight);
      setHeight(ref.current.scrollHeight);
    }
  }, [open]);

  useEffect(() => {
    if (autoClosed) {
      setHeight(0);
      setOpen(false);
    }
  }, [autoClosed]);

  useEffect(() => {
    if (contentArrayLength > 0) {
      setHeight(
        // @TODO Typescript errot around ref props
        [...(ref.current?.children || [])].reduce(
          (a, b) => a + (b.clientHeight || 0),
          0
        )
      );
    }
  }, [contentArrayLength]);

  return (
    <Root>
      <Header
        bold
        onClick={(e) => {
          if (!disableClickTarget?.contains(e.target)) {
            toggleAccordion();

            if (typeof onClickHeader === "function") {
              onClickHeader();
            }
          }
        }}
        alignItems="center"
        justifyContent={chevronOnRight ? "space-between" : "flex-end"}
        style={chevronOnRight ? {} : { flexDirection: "row-reverse" }}
        noHover={noHover}
        headerHeight={headerHeight}
        headerPadding={headerPadding}
        headerBackground={headerBackground}
        headerHoverBackground={headerHoverBackground}
        headerBorderRadius={headerBorderRadius}
      >
        {title} <Spacer size="4" />
        {chevronContainerHover ? (
          <Container>
            <Icon
              name={`chevron ${chevronDirection}`}
              fill={chevronColor}
              hoverFill={chevronHoverColor}
              hover
            />
          </Container>
        ) : (
          <Icon
            name={`chevron ${chevronDirection}`}
            fill={chevronColor}
            hoverFill={chevronHoverColor}
            hover
          />
        )}
      </Header>
      {divider && !open ? (
        <Divider offset={offsetDivider} style={{ marginTop }} />
      ) : null}

      {/*@TODO Typescript errot around ref props */}

      <Content ref={ref} height={finalHeight} contentOverflow={contentOverflow}>
        {open && content}
      </Content>
    </Root>
  );
}
