import React from "react";

import Text from "./Text";
import Check from "./Check";
import Textarea from "./Textarea";
import Radio from "./Radio";

function Input(props: any) {
  return <Text {...props} />;
}

Input.Text = Text;
Input.Textarea = Textarea;
Input.Check = Check;
Input.Radio = Radio;

export default Input;
