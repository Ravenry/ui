import React from 'react';
import { useField } from 'formik';
import { Label, Row, Spacer, Text, Input } from '@ravenry/ui';

const FieldAreaWithFormikHooks = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const {
    placeholder,
    name,
    minRows,
    maxRows,
    maxLength = 500,
    labelColor,
    _labelAs,
    required = false,
    regular,
    error,
    hasCounter,
  } = props;

  return (
    <>
      {label && (
        <Label
          inline={props.inline}
          color={labelColor}
          _as={_labelAs}
          required={required}
          bold={regular ? false : true}
        >
          {label}
        </Label>
      )}
      <div style={{ position: 'relative' }}>
        <Input.Textarea
          name={name}
          rows={minRows}
          maxRows={maxRows}
          maxLength={maxLength}
          placeholder={placeholder}
          {...field}
          {...props}
          borderRadius={props.borderRadius}
          error={error ? true : false}
          hasCounter={false}
          label={undefined}
        >
          {field.value}
        </Input.Textarea>
        {(error || hasCounter) && (
          <>
            <Row justifyContent="space-between">
              <Text _as="b3" color="red">
                {error}
              </Text>
              {hasCounter && props.value.length >= 0 && (
                <Text _as="b3" color="black80">
                  {props.value.length}/{maxLength || 1000}
                </Text>
              )}
            </Row>
          </>
        )}
      </div>
    </>
  );
};

const FieldAreaWithoutFormikHooks = (props) => {
  const {
    placeholder,
    name,
    minRows,
    maxRows,
    maxLength = 500,
    labelColor,
    _labelAs,
    required = false,
    regular,
    label,
    subtitle,
    error,
    hasCounter,
  } = props;

  return (
    <>
      {label && (
        <>
          <Label
            inline={props.inline}
            color={labelColor}
            _as={_labelAs}
            required={required}
            bold={regular ? false : true}
          >
            {label}
          </Label>
          {subtitle ? (
            <>
              <Spacer size="4" display="block" />
              <Text _as="s6" color="black80">
                {subtitle}
              </Text>
            </>
          ) : null}
          <Spacer size="8" display="block" />
        </>
      )}
      <div style={{ position: 'relative' }}>
        <Input.Textarea
          name={name}
          rows={minRows}
          maxRows={maxRows}
          maxLength={maxLength}
          rootMargin="0"
          placeholder={placeholder}
          {...props}
          error={error ? true : false}
          hasCounter={false}
          label={undefined}
          description={undefined}
          borderRadius={props.borderRadius}
        ></Input.Textarea>
        {(error || hasCounter) && (
          <>
            <Spacer size="8" display="block" />
            <Row justifyContent="space-between">
              <Text _as="b3" color="red">
                {error}
              </Text>

              <Text _as="b3" color="black80">
                {(props.value || '').length}/{maxLength || 1000}
              </Text>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

const FieldArea = (props) => {
  const { withFormik = true } = props;

  if (withFormik) {
    return <FieldAreaWithFormikHooks {...props} />;
  }

  return <FieldAreaWithoutFormikHooks {...props} />;
};

export default FieldArea;
