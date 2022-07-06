import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Icon, Text } from "@ravenry/ui";
import colors from "ui/colors";
import { useOutsideClick } from "hooks/useOutsideClick";
import { Search } from "ui/molecules";

/**
 * Notification
 *
 * @param {Object} props - React props
 * @param {import("react").CSSProperties} [props.style] - inline style
 * @param {[]} props.notifications - list of notifs
 * @param {Function} props.onReadAll - callback when mark all as read clicked
 * @param {Function} props.onReadSelected - callback when one notif clicked
 * @param {Function} props.onNext - callback when notif is scrolled
 * @param {Boolean} props.hasMoreNotif - flag to decide to fetch more notif or not
 * @param {Number} props.unreadNotifs - number of unread notifs
 */

const NotifContainer = styled.div`
  margin: auto;
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;

const NotifDropdown = styled.div`
  position: absolute;
  right: -100px;
  /* height: 300px; */
  top: 43px;
  width: 100vw;
  padding: 24px;

  background-color: ${colors.backgroundWhite};
  border-bottom: 1px solid ${colors.black10};
`;

export default function SearchMobile(props) {
  const { style } = props;

  const [dropdown, setDropdown] = useState({ open: false });
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setDropdown({ ...dropdown, open: false });
  });

  return (
    <NotifContainer style={style} ref={ref}>
      <div>
        <Icon
          name="search"
          clickable
          hover
          hoverFill="black100"
          onClick={() => setDropdown({ ...dropdown, open: !dropdown.open })}
        />
      </div>
      {dropdown.open ? (
        <NotifDropdown>
          <Text>SEARCH</Text>
          <Search width="208px" />
        </NotifDropdown>
      ) : null}
    </NotifContainer>
  );
}
