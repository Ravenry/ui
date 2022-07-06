import { ReactNode } from "react";
import styled from "styled-components";
import colors from "../utils/colors";

const ErrorTextStyled = styled.div`
  color: ${colors.red};
  font-size: 0.75rem;
  line-height: 16px;
  letter-spacing: 0.1px;
  margin: 0;
`;

export default function ErrorText({ children }: { children: ReactNode }) {
  return <ErrorTextStyled>{children}</ErrorTextStyled>;
}
