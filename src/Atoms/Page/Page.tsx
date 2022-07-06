import React from "react";
import styled, { css } from "styled-components";
import { isMobile, isBrowser } from "react-device-detect";

const Root = styled.div`
  height: calc(100vh - 225px);
  width: 100%;
  display: block;
`;

const Top = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
  align-items: center;
`;
const Bottom = styled.div``;
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const ContentLeft = styled.div`
  width: ${({ width }) => width || "300px"};
  margin-right: 16px;
`;
const ContentMiddle = styled.div`
  flex-grow: ${isBrowser && "1"};
  ${isMobile &&
  css`
    width: 100%;
    /* padding: 16px; */
  `}
`;
const ContentRight = styled.div`
  width: ${({ width }) => width || "300px"};
  margin-left: 16px;
  margin-top: 16px;
`;

export default function Page(props) {
  return <Root {...props} />;
}

Page.Top = Top;
Page.Bottom = Bottom;
Page.Content = Content;
Page.ContentLeft = ContentLeft;
Page.ContentMiddle = ContentMiddle;
Page.ContentRight = ContentRight;
