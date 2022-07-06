import React from "react";
import styled from "styled-components";
import { RequiredLabel, Spacer, Row } from "../";
import Text, { PropsText } from "../Text/Text";

interface Props extends PropsText {
  clickable?: boolean;
  htmlFor?: string;
  // Set required true if you want to show the required label
  required?: boolean;
}

interface RootLabelProps extends Props {}

export const RootLabel = styled(Text)<RootLabelProps>`
  ${({ clickable }) => (clickable ? "cursor: pointer;" : "")}
`;

export default function Label({ children, required = false, ...rest }: Props) {
  return (
    <Row>
      <RootLabel {...rest} forwardedAs="label" inline={required}>
        {children}
      </RootLabel>
      {required && (
        <>
          <Spacer size="8" />
          <RequiredLabel />
        </>
      )}
    </Row>
  );
}
