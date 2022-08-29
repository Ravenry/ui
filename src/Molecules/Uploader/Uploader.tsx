import React from 'react';
import { Uploader as Up } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import styled from 'styled-components';
import colors from '../../shared/colors';
import { Icon } from '@ravenry/ui';

const UploadButton = styled.div`
  display: ${(props) => (props.disabled ? 'none' : 'flex')} !important;
  color: white !important;
  background-color: ${colors.purple} !important;
  justify-content: center;
  height: 32px;
  width: 150px;
  align-items: center;
  &:hover {
    background-color: ${colors.purple60} !important;
  }
`;

export default function Uploader(props) {
  const { limit, onOverLimit } = props;

  const [disabled, setDisabled] = React.useState(props.file.length > 0);

  const handleChange = (e) => {
    if (limit && e[0]?.blobFile.size > limit) {
      onOverLimit();

      return;
    }

    setDisabled(!disabled);
    props.onChange(e);
  };

  return (
    <div>
      <Up
        onChange={handleChange}
        disabled={disabled || props.disabled}
        autoUpload={false}
        draggable={props.draggable}
        multiple={false}
        onRemove={() => {
          setDisabled(false);
          props.onRemove();
        }}
        fileList={props.file}
      >
        {props.draggable ? (
          <div style={{ padding: 80, display: disabled ? 'none' : 'block' }}>
            Click or Drag files to this area to upload {disabled ? 'disabled' : 'enabled'}
          </div>
        ) : (
          <UploadButton disabled={disabled}>
            <div style={{ display: 'flex' }}>
              <Icon name="upload" fill="white" />
              <div>Attach file</div>
            </div>
          </UploadButton>
        )}
      </Up>
    </div>
  );
}
