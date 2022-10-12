import React, { Component } from 'react';
import styled from 'styled-components';

import Text from './Text';
import Check from './Check';
import Radio from './Radio';
import FieldArea from './FieldArea';
import Select from './Select';
import SelectUser from './SelectUser';
import CurrencyStorefront from './CurrencyStorefront';
import DatePicker from "./DatePicker";
import File from "./File";
import Multiple from './Multiple';
import Multiple2 from './Multiple2';

const Container = styled.div`
  /* width: ${(props) => props.width && props.width}; */
  width: 100%;
`;

export default class Fields extends Component {
  static Text = Text;

  static Check = Check;

  static Radio = Radio;

  static FieldArea = FieldArea;

  static Select = Select;

  static SelectUser = SelectUser;

  static CurrencyStorefront = CurrencyStorefront;

  // static Currency = Currency;
  static Multiple = Multiple;

  static Multiple2 = Multiple2;

  static DatePicker = DatePicker;

  static File = File;

  render() {
    return <Container {...this.props} />;
  }
}
