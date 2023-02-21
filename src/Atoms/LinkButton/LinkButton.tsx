import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import A from "../A";
import Text from "../Text";

const LinkText = styled(Text)`
  display: inline-block;
  cursor: pointer;
`;

export default function LinkButton(props: any) {
  const { href, to, onClick, children, primary, ...rest } = props;

  const history = useHistory();

  if (href) {
    return (
      <A href={href} newTab underLineOnHover {...rest}>
        {children}
      </A>
    );
  }

  if (to) {
    return (
      <LinkText
        _as="btn1"
        color={primary ? "blue100" : "black60"}
        hoverColor={primary ? "blue100" : "black100"}
        underLineOnHover
        forwardedAs="span"
        onClick={() => history.push(to)}
      >
        {children}
      </LinkText>
    );
  }

  if (onClick) {
    return (
      <LinkText
        _as="btn1"
        color={primary ? "blue100" : "black60"}
        hoverColor={primary ? "blue100" : "black100"}
        underLineOnHover
        forwardedAs="span"
        onClick={onClick}
      >
        {children}
      </LinkText>
    );
  }

  return null;
}
