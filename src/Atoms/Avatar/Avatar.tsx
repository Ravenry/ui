import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import colors from "../utils/colors";

interface ContainerStyleProps {
  size: "larger" | "large" | "big" | "medium" | "small" | string | undefined;
  image?: boolean;
  saved?: boolean;
  square?: boolean;
}

const Container = styled.div<ContainerStyleProps>`
  position: relative;
  width: ${({ size }) =>
    size === "larger"
      ? "125px"
      : size === "large"
      ? "100px"
      : size === "big"
      ? "88px"
      : size === "medium"
      ? "48px"
      : size === "small"
      ? "40px"
      : "32px"};
  height: ${({ size }) =>
    size === "larger"
      ? "125px"
      : size === "large"
      ? "100px"
      : size === "big"
      ? "88px"
      : size === "medium"
      ? "48px"
      : size === "small"
      ? "40px"
      : "32px"};
  ${({ image, size }) =>
    !image &&
    css`
      line-height: ${size === "larger"
        ? "125px"
        : size === "large"
        ? "100px"
        : size === "big"
        ? "88px"
        : size === "medium"
        ? "48px"
        : size === "small"
        ? "40px"
        : "32px"};
    `}
  font-size: ${({ size }) =>
    size === "larger"
      ? "56px"
      : size === "large"
      ? "48px"
      : size === "big"
      ? "36px"
      : size === "medium"
      ? "16px"
      : size === "small"
      ? "0.875rem"
      : "14"};
  text-align: center;
  display: block;
`;

interface ImageStyleProps {
  size: "large" | "big" | "medium" | "small" | string | undefined;
  url?: "string";
  saved?: boolean;
  square?: boolean;
}

const Image = styled.img<ImageStyleProps>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) =>
    props.square ? "10px" : props.size === "big" ? "75px" : "50%"};
  ${({ saved }) => (saved ? `border: 1px solid ${colors.purple}` : "")};
`;

const Initial = styled.div<ContainerStyleProps>`
  width: ${(props) =>
    props.size === "larger"
      ? "125px"
      : props.size === "large"
      ? "100px"
      : props.size === "big"
      ? "88px"
      : props.size === "medium"
      ? "48px"
      : props.size === "small"
      ? "40px"
      : "32px"};
  height: ${(props) =>
    size === "larger"
      ? "125px"
      : props.size === "large"
      ? "100px"
      : props.size === "big"
      ? "88px"
      : props.size === "medium"
      ? "48px"
      : props.size === "small"
      ? "40px"
      : "32px"};
  background-color: ${colors.blue};
  ${({ saved }) => (saved ? `border: 1px solid ${colors.purple}` : "")};
  color: ${colors.white};
  border-radius: ${(props) =>
    props.square ? "10px" : props.size === "big" ? "75px" : "50%"};
`;

const SavedTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;

  position: absolute;
  width: 48px;
  height: 16px;
  left: -4px;
  top: 26px;

  /* Extension / Purple 20 */

  background: #e9ecfe;
  /* Extension / Purple 100 */

  border: 1px solid #7886f9;
  box-sizing: border-box;
  border-radius: 20px;

  font-size: 10px;
  line-height: 12px;
  color: #7886f9;
  font-weight: bold;
`;

interface AvatarProps {
  size?: "larger" | "large" | "big" | "medium" | "small" | string;
  name?: string;
  url: string | null;
  children?: React.ReactNode;
  saved?: boolean;
  /**
   * Default is round, set true for square shape
   */
  square?: boolean;
}

/**
 * Avatar
 *
 * @param {Object} props - props of the component
 * @param {"big" | "medium" | String} [props.size] - size of the avatar
 * @param {String} [props.url] - url of the image
 * @param {String} [props.name] - name of the profile to construct initial
 */
export default function Avatar(props: AvatarProps) {
  const { name } = props;

  const [url, setUrl] = useState(props.url);

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  const initial = name
    ?.split(" ")
    .map((n, i, { length }) => (i === 0 || i === length - 1 ? n.charAt(0) : ""))
    .join("")
    .toUpperCase();

  return (
    <Container size={props.size} image={!!url} square={props.square}>
      {url ? (
        <Image
          saved={props.saved}
          src={url}
          onError={() => setUrl(null)}
          size={props.size}
          square={props.square}
        />
      ) : (
        <Initial saved={props.saved} size={props.size} square={props.square}>
          {initial || props.children}
        </Initial>
      )}
      {props.saved && <SavedTag>Saved</SavedTag>}
    </Container>
  );
}
