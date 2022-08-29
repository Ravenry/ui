import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import Responsive from "helper/responsive";
import { Segment, Spacer, UnreadDot, Container, Dropdown } from "@ravenry/ui";
import { IconButton } from "..";
import colors from "ui/colors";
import getElevation from "ui/elevations";
import { useOutsideClick } from "hooks/useOutsideClick";

const CardRoot = styled(Segment)`
  position: relative;
  margin-bottom: ${({ isMobile }) => (isMobile ? "24px" : "24px")};
  padding: ${({ padding }) => padding || "0px 16px"};
  cursor: pointer;
  display: flex;
  width: ${({ isMobile }) => isMobile && "100%"};

  ${getElevation(2)}

  &:hover {
    ${({ noHoverShadow }) => (noHoverShadow ? "" : `${getElevation(4)}`)}
  }
  ${({ borderColor }) => (borderColor ? `border-color: ${borderColor};` : "")}
`;

const CardContent = styled.div`
  ${({ isMobile }) =>
    isMobile
      ? css`
          display: flex;
          /* flex-grow:1; */
          width: calc(100vw - 64px);
          flex-wrap: wrap;
          justify-content: space-between;
          ${({ center }) => (center ? "align-items: center;" : "")}
        `
      : css`
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          ${({ center }) => (center ? "align-items: center;" : "")}
          flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
        `}
`;

const Unread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  padding: ${({ isMobile }) => (isMobile ? "24px 8px 24px 0px" : "0px")};
`;

const CardPrefix = styled.div`
  width: ${({ width }) => width || "80px"};
  display: flex;
  align-items: center;
  border-right: 1px solid
    ${({ borderRightColor }) =>
      borderRightColor
        ? colors[borderRightColor]
          ? colors[borderRightColor]
          : borderRightColor
        : colors.black5};
  margin-right: ${({ marginRight }) => marginRight || "24px"};
`;

const CardMiddle = styled.div`
  flex-grow: 1;
  padding: 16px 0px;
`;

const CardAction = styled.div`
  align-self: center;
  width: ${(props) => (props.width ? props.width : "225px")};
`;

const CardActionMobile = styled.div`
  width: calc(100vw - 96px);
`;

const CardHeader = styled.p`
  font-size: 1.125rem;
  line-height: 22px;
  font-weight: bold;
  width: ${({ isMobile }) => isMobile && "calc(100vw - 92px);"};
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  color: ${colors.black};
`;

const Tag = styled.div`
  position: absolute;
  ${({ tagPosition }) =>
    tagPosition === "top-left"
      ? `top: 0;
         left: 0;`
      : tagPosition === "top-right"
      ? `top:0;
         right: 0;`
      : tagPosition === "bottom-left"
      ? `bottom:0;
         left: 0;`
      : tagPosition === "bottom-right"
      ? `bottom:0;
         right: 0;`
      : `top:0;
         right: 0;`}
`;

export default function Card(props) {
  const {
    title,
    prefix,
    prefixStyle,
    children,
    action,
    center,
    actionWidth,
    unread,
    tag,
    tagPosition,
    ellipsisItems = [],
  } = props;
  const { isMobile } = Responsive();
  const ref = useRef(null);
  const [dropdown, setDropdown] = useState({
    open: false,
  });

  useOutsideClick(ref, () => {
    setDropdown({ open: false });
  });

  return (
    <CardRoot isMobile={isMobile} {...props} >
      {prefix && (
        <CardPrefix isMobile={isMobile} {...prefixStyle}>
          {prefix}
        </CardPrefix>
      )}
      <Unread isMobile={isMobile}>{unread ? <UnreadDot /> : null}</Unread>
      <CardMiddle isMobile={isMobile}>
        {title && (
          <>
            <CardHeader isMobile={isMobile}>{title}</CardHeader>
            <Spacer size="8" display="block" />
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <CardContent isMobile={isMobile} center={center}>
            {children}
          </CardContent>
          {!isMobile && (
            <CardAction width={actionWidth}>{action || ""}</CardAction>
          )}
        </div>
        {isMobile && (
          <CardActionMobile width={actionWidth}>
            {action || ""}
          </CardActionMobile>
        )}
      </CardMiddle>

      <Tag tagPosition={tagPosition}>{tag}</Tag>
      {ellipsisItems.length > 0 && (
        <Container flex alignItems="center">
          <Spacer size="24" display="block" />
          <div ref={ref}>
            <IconButton
              name="ellipsis vertical"
              tooltipOptions={{
                content: "Options",
                position: { top: "-40px", right: "-22px" },
                arrowPosition: "bottom-center",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDropdown({
                  ...dropdown,
                  open: !dropdown.open,
                });
              }}
            />
          </div>
        </Container>
      )}
      {dropdown.open && (
        <Dropdown style={{ top: "65px", left: "-150px", zIndex: 2 }}>
          {ellipsisItems.map((opt) => (
            <Dropdown.Item
              key={`option-${opt.text}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof opt.onClick === "function") {
                  opt.onClick();
                }
              }}
            >
              {opt.text}
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
    </CardRoot>
  );
}
