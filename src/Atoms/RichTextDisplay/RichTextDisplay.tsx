import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import colors from "../utils/colors";

const Root = styled(TextareaAutosize)`
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  color: ${colors.black};
  font-size: 0.75rem;
  overflow-y: hidden;
`;

export default function RichTextDisplay(props) {
  return <Root disabled key={props.children} value={props.children} />;
}
