import React from 'react';
import styled, { css } from 'styled-components';

import { Icon, Tooltip } from '../../Atoms';
import colors, { ColorOptions } from '../../shared/colors';

interface RootProps {
  color: 'blue' | 'black';
  hoverColor?: 'blue' | 'black';
  disabled?: boolean;
  active?: boolean;
  solid?: boolean;
  onClick: Function;
  width: string;
}

const Root = styled.button<RootProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: 32px;
  border-radius: 5px;
  background: transparent;
  
  ${({ solid }) =>
    solid &&
    css`
      box-shadow: 0px 0.25px 1px rgba(0, 0, 0, 0.039), 0px 0.85px 3px rgba(0, 0, 0, 0.19);
      background: ${colors.white};
    `}
  };

  ${({ disabled, active, color, hoverColor }) =>
    disabled
      ? css`
          background-color: ${colors.black10};

          & > div > svg > path {
            fill: ${colors.black50};
          }

          & > svg > path {
            fill: ${colors.black50};
          }
        `
      : active
      ? `
        background-color: ${colors.black5};

        & > div > svg > path {
          fill: ${
            color === 'black'
              ? colors[`${color}80` as ColorOptions]
              : colors[`${color}90` as ColorOptions]
          };
        }
        `
      : `  
        & > div > svg > path {
          fill: ${
            color === 'black'
              ? colors[`${color}60` as ColorOptions]
              : colors[`${color}100` as ColorOptions]
          };
          }

          & > svg > path {
            fill: ${
              color === 'black'
                ? colors[`${color}60` as ColorOptions]
                : colors[`${color}100` as ColorOptions]
            };
          }

          &:hover {
            background-color: ${
              color === 'black'
                ? colors[`${color}5` as ColorOptions]
                : colors[`${color}10` as ColorOptions]
            };

            & > div > svg > path {
              fill: ${
                hoverColor
                  ? colors[`${hoverColor}80` as ColorOptions]
                  : colors[`${color}90` as ColorOptions]
              };
            }

            & > svg > path {
              fill: ${
                hoverColor === 'black'
                  ? colors[`${hoverColor}80` as ColorOptions]
                  : colors[`${hoverColor}90` as ColorOptions]
              };
            }
          }

          &:active {
            background-color: ${colors.black5};

            & > div > svg > path {
              fill: ${colors[color]};
            }
          }
        `}
`;

interface IconButtonProps {
  /** color of icon fill, default to black  */
  color?: 'blue' | 'black';
  hoverColor?: 'blue' | 'black';
  disabled?: boolean;
  active?: boolean;
  name: string;
  width?: string;
  tooltipOptions?: {
    position: string | { top: string; left: string } | { top: string; right: string };
    content: string;
    arrowPosition:
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'bottom-right'
      | 'bottom-left'
      | 'bottom-center'
      | { top: string; right: string };
  };
  solid?: boolean;
  onClick?: (e: any) => void;
  backgroundColor?: string;
  'data-cy'?: string;
}

export default function IconButton(props: IconButtonProps) {
  const {
    color = 'black',
    hoverColor,
    name,
    tooltipOptions,
    solid,
    disabled,
    active,
    onClick = () => null,
    width = '32px',
  } = props;

  return (
    <Root
      type="button"
      onClick={onClick}
      solid={solid}
      hoverColor={hoverColor}
      color={color}
      disabled={disabled}
      width={width}
      active={active}
      data-cy={props['data-cy']}
    >
      {tooltipOptions ? (
        <Tooltip {...tooltipOptions}>
          <Icon name={name} />
        </Tooltip>
      ) : (
        <Icon name={name} />
      )}
    </Root>
  );
}
