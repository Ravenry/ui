import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import {
//   BrowserView,
//   MobileView,
//   isTablet,
//   isMobile,
// } from "react-device-detect";

import { Notification } from 'ui/molecules';
import { Spacer, Icon, Text, NavItem, NavItemMobile, Row } from '@ravenry/ui';
import colors from 'ui/colors';
import Logo from 'ui/assets/Solos_Logo_Colour.png';
import { setHeader, setSticky } from 'store/reducer/global';
import { useDispatch } from 'react-redux';
import responsive from 'helper/responsive';
import UserInfo from './UserInfo';
/**
 * Navbar
 *
 * @param {Object} props -
 * @param {Object[]} props.menus - array of menus
 * @param {String} props.menus[].path - target path
 * @param {String} props.menus[].display - menu text
 * @param {String} props.menus[].icon - icon to display
 * @param {Boolean} props.logoOnly - flag to decide whether navbar only has logo
 * @param {Boolean} props.isLoggedIn -
 * @param {String} props.domain - god, client, freelancer
 * @param {Object} props.notification -
 * @param {Array} props.notification.notifications -
 * @param {Function} props.notification.onReadAll -
 * @param {Function} props.notification.onReadSelected -
 */

const RootDesktop = styled.div`
  background-color: ${colors.white};
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 24px;
  border-bottom: 1px solid ${colors.black10};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  ${({ isLoggedIn }) => (isLoggedIn ? '' : 'justify-content: space-between;')}
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  width: 1200px;
  height: 56px;
`;

const RootMobile = styled.div`
  background-color: ${colors.white};
  /* height: 40px; */
  display: flex;
  align-items: center;
  padding: 0px;
  border-top: 1px solid ${colors.black10};
  position: -webkit-sticky;
  position: fixed;
  bottom: 0px;
  z-index: 10;
  width: 100%;
`;

const Brand = styled.div`
  margin: auto 0;
`;

const NavGroup = styled(Row)`
  align-items: center;
  justify-content: space-around;
  width: ${({ isMobile }) => isMobile && '100%'};
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify=content: center;
`;

export default function Navbar(props) {
  const { menus, isLoggedIn, domain, notification, logoOnly, needLoginLink } = props;
  const history = useHistory();
  const path = useLocation();
  const dispatch = useDispatch();
  const { isMobile } = responsive();

  const handleMenuClick = (item) => {
    history.push({
      pathname: `/${item.path}`,
      search: item.search ? `?${item.search}` : '',
    });
    dispatch(setSticky(null));
  };

  React.useEffect(() => {
    if (menus !== undefined) {
      menus.map((item) => {
        if (path.pathname.includes(`/${item.path}`)) {
          dispatch(setHeader(item.display));
        }
      });
    }
    dispatch(setSticky(null));
  }, [path.pathname]);

  return !isMobile ? (
    <>
      <RootDesktop isLoggedIn={isLoggedIn}>
        <Content>
          <Brand>
            {/* <Link to="/"> */}
            <img src={Logo} alt="solos logo" width="100px" />
            {/* </Link> */}
          </Brand>
          <Spacer size="128" horizontal />
          {isLoggedIn && !logoOnly ? (
            <>
              <NavContainer>
                <NavGroup>
                  {menus !== undefined &&
                    menus.map((item) => (
                      <NavItem
                        key={`nav-item-${item.path}`}
                        as={Link}
                        to={{
                          pathname: `/${item.path}`,
                          search: item.search ? `?${item.search}` : '',
                        }}
                        active={path.pathname.includes(`/${item.path}`)}
                        width={isMobile && `${100 / (menus.length + 1)}%`}
                        notif={item.notif}
                        center={!item.notif}
                      >
                        {item.display}
                      </NavItem>
                    ))}
                </NavGroup>
              </NavContainer>
              <Spacer size="128" horizontal />
            </>
          ) : (
            needLoginLink && (
              <Text _as="b1" color="black40">
                Already have an account? <Link to="/login">Login</Link>
              </Text>
            )
          )}
          {isLoggedIn && !logoOnly && (
            <>
              <Notification
                notifications={notification && notification.notifications}
                style={{ margin: 'auto' }}
                onReadAll={notification && notification.onReadAll}
                onReadSelected={notification && notification.onReadSelected}
                unreadNotifs={notification.unreadNotifs}
                onNext={notification.onNext}
                hasMoreNotif={notification.hasMoreNotif}
              />
              <Spacer size="16" />
            </>
          )}
          {domain !== 'public' && !logoOnly && <UserInfo domain={domain} />}
        </Content>
      </RootDesktop>
    </>
  ) : (
    <>
      <RootMobile>
        {isLoggedIn && (
          <NavGroup isMobile={isMobile}>
            {menus !== undefined &&
              menus.map((item, index) => (
                <NavItemMobile
                  key={'nav-item-' + item.path + '-' + index}
                  onClick={() => handleMenuClick(item)}
                  active={path.pathname.includes(`/${item.path}`)}
                >
                  <Icon
                    name={item.icon}
                    fill={path.pathname.includes(`/${item.path}`) ? 'black' : 'black40'}
                  />
                  {item.display}
                </NavItemMobile>
              ))}
            {/* <UserInfo domain={domain} /> */}
          </NavGroup>
        )}

        {/* <Spacer style={{ flexGrow: 1 }} /> */}
      </RootMobile>
    </>
  );
}
