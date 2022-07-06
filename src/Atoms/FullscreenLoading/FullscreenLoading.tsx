import React from "react";
import styled from "styled-components";

import Text from "../Text/Text";
import "./loader.css";

const Root = styled.div`
  /* padding: 40px;s */
  display: ${(props) => (props.open ? "flex" : "none")}; /* Hidden by default */
  position: fixed; /* Stay in place */
  align-content: center;
  align-items: center;
  justify-content: space-around;
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(231, 234, 240); /* Fallback color */
  background-color: rgb(231, 234, 240, 0.7);
  /* background-color: rgb(0, 0, 0, 0.5); */
  /* opacity: 0.7; */
`;

export default function FullscreenLoading(props) {
  return (
    <Root open={props.open}>
      <div>
        <Text textAlign="center" fluid color="black60">
          Loading
        </Text>
        <div style={{ height: "5em" }}>
          <div className="loader" />
        </div>
      </div>
    </Root>
  );
}
