import Responsive from "../utils/responsive";
import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import styled, { css } from "styled-components";
import { HideOn } from "react-hide-on-scroll";
import colors from "../utils/colors";
import "./react-tabs.css";

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

const Underline = styled.div`
  height: 2px;
  background: ${colors.blue};
`;

const Title = styled.div`
  ${({ size }) =>
    size === "big" &&
    ` font-size: 1.125rem;
      line-height: 24px;
      padding-top: 16px;
      padding-bottom: 16px;
  `}
  ${({ isActive, isMobile }) =>
    !isMobile &&
    isActive &&
    css`
      font-weight: bold;
      flex-direction: column;
      gap: 4px;
      display: flex;
      box-sizing: border-box;
    `}
`;

const CustomTabList = styled(TabList).withConfig({
  // add props to the array to prevent them passed to the element
  // isMobile is prevented to remove warning in developer console
  // since it is used only for styled-components styling condition
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["isMobile"].includes(prop) && defaultValidatorFn(prop),
})`
  /* background-color: red; */
  display: flex;
  list-style: none;
  margin-bottom: 0px;
  padding: 0;

  ${({ isMobile }) =>
    isMobile &&
    css`
      overflow: auto;
      display: -webkit-inline-box;
      padding: 8px 24px;
      margin: 8px -24px;
      width: 100vw;
    `}

  ${({ isMobile, isSticky }) => isMobile && isSticky && css``}
`;

const Sticky = styled.div`
  display: flex;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100vw;
  height: 64px;
  align-items: center;
  padding: 16px 24px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.black10};
`;

const TabItem = styled(Tab).withConfig({
  // add props to the array to prevent them passed to the element
  // isMobile & isActive are prevented to remove warning in developer console
  // since those are used only for styled-components styling condition
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["isMobile", "isActive"].includes(prop) && defaultValidatorFn(prop),
})`
  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${({ isActive }) =>
            isActive ? colors.blue : colors.white};
          color: ${({ isActive }) =>
            isActive ? colors.white : colors.black40};
          margin-right: 16px;
          border: 1px solid
            ${({ isActive }) => (isActive ? colors.blue : colors.black10)};
          border-radius: 5px;
          height: 32px;
          line-height: 2rem;
          padding: 0px 16px;
          text-align: center;
          position: relative;
        `
      : css`
          background-color: transparent;
          padding: 8px 24px;
          border-radius: 10px 10px 0px 0px;
          cursor: pointer;
          z-index: 1;
          margin-bottom: ${({ isActive }) => (isActive ? "-1px" : "0px")};
          padding-bottom: ${({ isActive }) => (isActive ? "0px" : "8px")};
        `}
`;

export default function CustomTab(props) {
  const tabs = props.items;
  const { width, tabIndex, onSelect, size, basic } = props;

  const [selectedIndex, setSelectedIndex] = useState(tabIndex || 0);

  useEffect(() => {
    setSelectedIndex(tabIndex || 0);
  }, [tabIndex]);

  const { isMobile } = Responsive();

  const TabItemList = (
    <CustomTabList isMobile={isMobile}>
      {tabs &&
        tabs.map((tab, index) => (
          <TabItem
            data-cy={`tab-item-${index}`}
            isMobile={isMobile}
            isActive={index === selectedIndex}
            key={index}
            style={
              size === "big" ? { padding: "0 24px", height: "58px" } : undefined
            }
          >
            <Item>
              <Title
                isActive={index === selectedIndex}
                size={size}
                isMobile={isMobile}
              >
                {tab.title}
                {index === selectedIndex && <Underline />}
              </Title>{" "}
              {!basic && <UnreadDot isHidden={!tab.hasNotif} />}
            </Item>
          </TabItem>
        ))}
    </CustomTabList>
  );

  return (
    <Tabs
      style={width ? { width } : undefined}
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
        onSelect && onSelect(index);
      }}
      isMobile={isMobile}
    >
      {isMobile && (
        <HideOn inverse height={400}>
          <Sticky>{TabItemList}</Sticky>
        </HideOn>
      )}
      {TabItemList}

      {tabs &&
        tabs.map((tab, index) => (
          <TabPanel
            key={index}
            style={{
              borderTopLeftRadius: !isMobile && index === 0 && 0,
            }}
          >
            {tab.content}
          </TabPanel>
        ))}
    </Tabs>
  );
}
