import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isBrowser, isMobile } from 'react-device-detect';
import { A } from '@ravenry/ui';
import { Avatar, Icon, Text, Row, Spacer } from '@ravenry/ui';
// import { A, Avatar, Icon, Text, Row, Spacer } from '@ravenry/ui';

import { setHeader, setLogout, setSticky } from 'store/reducer/global';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { useUser } from 'hooks/useUser';
import colors from '../../shared/colors';
import Feedback from 'ui/molecules/Feedback/Feedback';
import { amplitudeEvent } from 'helper/amplitude';

const Container = styled.div`
  display: flex;
  z-index: 0;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  margin: auto;

  cursor: pointer;
  /* padding: 8px; */
  max-width: 300px;
`;

const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  display: flex;
  font-size: 0.875rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: ${isMobile ? '-150px' : isBrowser ? '32px' : '32px'};
  display: flex;
  flex-direction: column;
  background: white;

  width: 150px;

  /* Hover Elevation */

  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
  border-radius: 5px;
`;

const DropdownP = styled(Text)``;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  height: ${({ height }) => height || '44px'};
  padding: 0 16px;
  box-sizing: border-box;
  &:hover {
    background-color: ${colors.backgroundDark};
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  ${DropdownP} {
    color: ${colors.black40};
  }

  &:hover ${DropdownP} {
    color: ${colors.black100};
  }
`;

export default function UserInfo() {
  const global = useSelector((state) => state.global);
  const singleUser = useSelector((state) => state.global.user);
  const [isLoggedIn, setIsLoggedIn] = useState(global.isLoggedIn);
  const { fetchSelf } = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(global.isLoggedIn);
  }, [global.isLoggedIn]);

  useEffect(() => {
    global.user.userId && fetchSelf();
  }, [global.user.userId]);

  useOutsideClick(ref, () => {
    setOpenDropdown(false);
  });

  let helpCenterUrl =
    global.user?.domain === 'freelancer'
      ? 'https://www.notion.so/ravens/Ravenry-Freelancers-Help-Centre-0dade0d5c8284185b04aab9e9e4797ad'
      : global.user?.domain === 'client'
      ? 'https://www.notion.so/ravens/Ravenry-Help-Center-6e4fba5eb5b94c9facd77a2e06237c3d'
      : '';

  return (
    isLoggedIn && (
      <>
        <Container
          data-cy="navbar-user-info"
          onClick={() => setOpenDropdown(!openDropdown)}
          ref={ref}
        >
          <>
            <div>
              <Avatar
                url={singleUser?.avatar}
                name={
                  singleUser?.firstName && singleUser?.lastName
                    ? `${singleUser?.firstName} ${singleUser?.lastName}`
                    : singleUser?.fullName
                }
              />
            </div>

            <Name>
              <Row alignItems="center" noWrap>
                <Row>
                  <Text _as="b2" color="black60" ellipsis>
                    Hello,
                  </Text>
                  <Spacer size="4" />
                  <Text color="black60" _as="b2" bold ellipsis width="75px" display="inline-block">
                    {singleUser?.firstName
                      ? singleUser?.firstName
                      : singleUser?.fullName?.split(' ')[0]}
                  </Text>
                </Row>
                <Spacer size="10" />
                <Icon name="menu" fill="black40" hoverFill="black100" hover />
              </Row>
            </Name>
          </>

          {openDropdown && (
            <Dropdown>
              {global.user?.domain === 'freelancer' && (
                <>
                  <DropdownItem
                    as={Link}
                    to="/freelancer/settings"
                    data-cy="navbar-user-info-freelancer-settings"
                  >
                    <DropdownP _as="b2">Settings</DropdownP>
                  </DropdownItem>

                  <DropdownItem as={A} href="https://www.solos.work/agreement" newTab>
                    <DropdownP _as="b2" onClick={() => amplitudeEvent('service agreement')}>
                      Service Agreement
                    </DropdownP>
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      dispatch(setLogout());
                      dispatch(setSticky(null));
                      dispatch(setHeader(null));
                      history.push(`/${global.user.domain}/login`);
                    }}
                  >
                    <DropdownP _as="b2">Logout</DropdownP>
                  </DropdownItem>
                </>
              )}
            </Dropdown>
          )}
        </Container>
        <Feedback
          open={feedbackOpen}
          userName={global.user.userName}
          email={global.user.email}
          domain={global.user.domain}
          onClose={() => setFeedbackOpen(false)}
        />
      </>
    )
  );
}
