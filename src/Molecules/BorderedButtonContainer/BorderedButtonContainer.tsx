import React from "react";
import styled from "styled-components";

import { Button, Container, Text, Spacer, ButtonProps } from "../../Atoms";
import colors from "../../shared/colors";

export interface Props extends ButtonProps {
  upperText?: string;
  lowerText?: string;
  upload?: boolean;
  onUpload?: (files: File[]) => void;
}

const Root = styled(Container)`
  padding: 24px 0;
  border-radius: 10px;
  border: 1px dashed ${colors.blue90};
  height: auto;
`;

const StyledButton = styled(Button)`
  margin: auto;
`;

export default function BorderedButtonContainer({
  children,
  upperText,
  lowerText,
  upload,
  onUpload,
  ...rest
}: Props) {
  const hiddenFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (upload) {
      if (hiddenFileInputRef.current) {
        hiddenFileInputRef.current.click();
      }
    } else {
      if (typeof rest.onClick === "function") {
        rest.onClick(e);
      }
    }
  };

  return (
    <Root fluid>
      {upperText && (
        <>
          <Spacer size="11" display="block" />
          <Text _as="s6" color="black80" textAlign="center" fluid>
            {upperText}
          </Text>
          <Spacer size="16" display="block" />
        </>
      )}
      <StyledButton {...rest} onClick={(e) => handleClick(e)}>
        {children}
      </StyledButton>
      <input
        type="file"
        ref={hiddenFileInputRef}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = "";
        }}
        style={{ display: "none" }}
        multiple={false}
        onChange={(e) => {
          if (typeof onUpload === "function" && e.target.files !== null) {
            onUpload(Array.from(e.target.files));
          }
        }}
      />
      {lowerText && (
        <>
          <Spacer size="16" display="block" />
          <Text _as="s6" color="black80" textAlign="center" fluid>
            {lowerText}
          </Text>
          <Spacer size="11" display="block" />
        </>
      )}
    </Root>
  );
}
