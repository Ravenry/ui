import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSticky } from "store/reducer/global";
import styled, { css } from "styled-components";
import colors from "../utils/colors";

const UnreadDot = styled.div`
  ${({ isHidden }) =>
    isHidden
      ? "background-color: transparent;"
      : `background-color: ${colors.red100};`}
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 8px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  ${({ size }) =>
    size === "big" &&
    ` font-size: 1.125rem;
      line-height: 24px;
      padding-top: 16px;
      padding-bottom: 16px;
  `}
`;

const Root = styled.div`
  display: block;
  width: 100vw;
`;

const TabList = styled.div`
  overflow: auto;
  display: -webkit-inline-box;
  padding: 8px 24px;
  margin: 8px -24px;
  width: 100vw;
`;

const Tab = styled.div`
  ${(props) =>
    props.outlined
      ? css`
          background-color: ${(props) =>
            props.isActive ? colors.blue : colors.white};
          color: ${(props) => (props.isActive ? colors.white : colors.black40)};
          margin-right: 16px;
          border: 1px solid
            ${(props) => (props.isActive ? colors.blue : colors.black10)};
          border-radius: 5px;
          height: 32px;
          line-height: 2rem;
          padding: 0px 16px;
          text-align: center;
        `
      : css`
          color: ${(props) =>
            props.isActive ? colors.black100 : colors.black40};
          margin-right: 16px;
          border-bottom: 2px solid
            ${(props) => (props.isActive ? colors.blue : "transparent")};
          /* height: 32px; */
          /* line-height: 2rem; */
          padding: 0px 8px 8px 0px;
          text-align: center;
        `}
`;

const Tabs = styled.div`
  width: calc(100vw - 48px);
`;

const TabPanel = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  min-height: 100vh;
  padding-bottom: 72px;
`;

export default function CustomTab(props) {
  const tabs = props.items;
  const dispatch = useDispatch();
  const { width, tabIndex, onSelect, basic } = props;

  const [selectedIndex, setSelectedIndex] = useState(tabIndex || 0);

  useEffect(() => {
    setSelectedIndex(tabIndex || 0);
  }, [tabIndex]);

  useEffect(() => {
    onSelect && onSelect(selectedIndex);
  }, [selectedIndex]);

  const TabHeading = () => (
    <TabList>
      {tabs &&
        tabs.map((tab, index) => (
          <Tab
            key={index}
            onClick={() => setSelectedIndex(index)}
            isActive={selectedIndex === index}
            outlined
          >
            <Item>
              <Title isActive={index === selectedIndex}>{tab.title}</Title>{" "}
              {!basic && <UnreadDot isHidden />}
            </Item>
          </Tab>
        ))}
    </TabList>
  );

  React.useEffect(() => {
    dispatch(setSticky(<TabHeading tabIndex={selectedIndex} />));
  }, [selectedIndex]);

  return (
    <Root>
      <TabHeading />
      <Tabs style={width ? { width } : undefined} selectedIndex={selectedIndex}>
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel key={index} isActive={selectedIndex === index}>
              {tab.content}
            </TabPanel>
          ))}
      </Tabs>
    </Root>
  );
}
