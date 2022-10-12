import React from 'react';
import { Icon, Input } from '@ravenry/ui';
import { useField, useFormikContext } from 'formik';

import { Container, Label, Warning } from './Shared';

const CurrencyStorefront = ({ label, width, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const multiplier = props.multiplier ? props.multiplier : 1;

  return (
    <Container inline={props.inline}>
      <Label inline={props.inline}>{label} </Label>
      <div
        style={{
          display: 'flex',
          width: width || 300,
          position: 'relative',
        }}
      >
        <Input
          disabled
          style={{ width: '64px', margin: '0px 8px 0px 0px' }}
          value={props.currency}
        />
        <Input
          {...field}
          {...props}
          style={{ margin: '0px 0px 0px 0px', width: '100%' }}
          // value={(field.value.value / 100).toFixed(2)}
          value={field.value > 0 && field.value / multiplier}
          error={meta.touched && meta.error}
          onChange={(e) => {
            // e.target.value !== "" &&
            //   e.target.value > 0 &&

            if (props.onChange) {
              props.onChange(e.target.value);
            }
            setFieldValue(props.name, parseInt(e.target.value * multiplier, 10));
          }}
          loading={props.loading ? true : undefined}
        />
        {props.warning ? (
          <Warning>
            <Icon name="warning" fill="#FFC260" />
          </Warning>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
};

export default CurrencyStorefront;
