import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Popup from 'reactjs-popup';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment-timezone';
import { Icon, Spacer } from '@ravenry/ui';

import colors from '../../utils/colors';
import { ErrorText, Label, Root, SuccessText } from './Shared';
import './Dates.css';

const Input = styled.input<{ icon?: any; borderRadius?: string; error?: boolean }>`
  padding: ${(props) => (props.icon ? '11px 47px 11px 16px' : '11px 16px')};
  width: 100%;
  height: ${({ height }) => height || '32px'};
  border-radius: ${({ borderRadius }) => borderRadius || '5px'};
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */

  ${(props) =>
    props.error
      ? css`
          border: 1px solid ${colors.red};
          color: ${colors.red};
          &::placeholder {
            color: ${colors.red};
            font-size: 0.875rem;
          }
        `
      : css`
          border: 1px solid ${colors.black10};
          color: ${colors.black};
          &::placeholder {
            color: ${colors.black20};
            font-size: 0.875rem;
          }
        `}

  &:focus {
    outline-color: none;
    outline-style: none;
    outline-width: 1px;
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }

  &:hover {
    ${({ disabled }) => !disabled && `border: 1px solid ${colors.blue90};`}
  }
`;

export default function DatePicker(props: any) {
  const { error, success, label, atLeast, width, height, borderRadius, iconMarginTop } = props;

  const [popupOpen, setPopupOpen] = useState(false);

  const onSelect = (dates: any) => {
    // setFieldValue(props.name, dates.format("YYYY-MM-DD"));
    const e = {
      target: {
        id: props.id,
        name: props.name,
        value: dates.format('dddd, D MMM YYYY'),
      },
    };
    props.onChange(e);
    setPopupOpen(false);
  };

  return (
    <>
      {label && <Label>{label.toUpperCase()}</Label>}
      <Root {...props}>
        <Popup
          open={popupOpen}
          trigger={() => (
            <div
              style={{
                display: 'inline-block',
                position: 'relative',
                width: width || '100%',
              }}
            >
              <Input
                onClick={(e) => {
                  e.preventDefault();
                  setPopupOpen(!popupOpen);
                }}
                value={props.value || ''}
                style={{ width: '100%' }}
                disabled={props.disabled}
                placeholder={props.placeholder}
                height={height}
                borderRadius={borderRadius}
                error={error}
              />
              <Icon
                name="calendar"
                style={{
                  margin: 5,
                  position: 'absolute',
                  top: iconMarginTop || 0,
                  right: 0,
                }}
              />
            </div>
          )}
          disabled={props.disabled}
          modal={false}
          // on="hover"
          position={props.position ? props.position : 'right center'}
          arrow={false}
          contentStyle={{
            padding: '30px 0.875rem',
            border: 'none',
            marginTop: 50,
            width: '345px',
            borderRadius: 5,
            backgroundColor: '#ffffff',
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
          }}
        >
          <DateRangePicker
            onSelect={onSelect}
            value={moment(props.value)}
            selectionType="single"
            minimumDate={atLeast}
          />
        </Popup>
        {error && (
          <>
            <Spacer size={8} display="block" />
            <ErrorText>{error}</ErrorText>
          </>
        )}
        {success && <SuccessText>{success}</SuccessText>}
      </Root>
    </>
  );
}
