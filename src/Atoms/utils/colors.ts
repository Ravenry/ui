export type ButtonColorOptions =
  | "blue"
  | "red"
  | "purple"
  | "green"
  | "black"
  | "linkedInBlue"
  | "white";

export type ColorOptions =
  | "blue"
  | "blue100"
  | "blue90"
  | "blue80"
  | "blue70"
  | "blue60"
  | "blue50"
  | "blue40"
  | "blue30"
  | "blue20"
  | "blue10"
  | "blue5"
  | "statsBlue"
  | "statsBlue100"
  | "statsBlue10"
  | "yellow"
  | "yellow100"
  | "yellow80"
  | "yellow60"
  | "yellow40"
  | "yellow20"
  | "statsYellow"
  | "statsYellow100"
  | "statsYellow10"
  | "purple"
  | "purple100"
  | "purple90"
  | "purple80"
  | "purple60"
  | "purple40"
  | "purple20"
  | "purple10"
  | "lightBlue"
  | "lightBlue100"
  | "lightBlue80"
  | "lightBlue60"
  | "lightBlue40"
  | "lightBlue20"
  | "linkedInBlue"
  | "linkedInBlueHover"
  | "linkedInBlue90"
  | "red"
  | "red100"
  | "red90"
  | "red80"
  | "red60"
  | "red40"
  | "red20"
  | "red10"
  | "statsRed"
  | "statsRed100"
  | "statsRed10"
  | "green"
  | "green100"
  | "green90"
  | "green80"
  | "green60"
  | "green40"
  | "green20"
  | "green10"
  | "statsGreen"
  | "statsGreen100"
  | "statsGreen10"
  | "white"
  | "semiWhite"
  | "black"
  | "black100"
  | "black80"
  | "black60"
  | "black50"
  | "black40"
  | "black20"
  | "black10"
  | "black5"
  | "grey"
  | "lightGrey"
  | "backgroundLight"
  | "backgroundDark"
  | "backgroundWhite"
  | "linkedInBlueHover"
  | "facebookBlue";

type ColorMap = {
  [key in ColorOptions]: string;
};

export const colors: ColorMap = {
  // BLUE
  blue: "#0050C5",
  blue100: "#0050C5",
  blue90: "#005FE7",
  blue80: "#3C7AA0",
  blue70: "#5299BF",
  blue60: "#6ABFE5",
  blue50: "#8FCCEA",
  blue40: "#B1D9F0",
  blue30: "#D2E8F6",
  blue20: "#F3F9FE",
  blue10: "#E2EEFF",
  blue5: "#F3F9FE",
  statsBlue: "#00B5CE",
  statsBlue100: "#00B5CE",
  statsBlue10: "#E1F1FF",

  // YELLOW
  yellow: "#FEBE3F",
  yellow100: "#FFC260",
  yellow80: "#FFCF81",
  yellow60: "#FFDCA3",
  yellow40: "#FFE8C4",
  yellow20: "#FFF5E6",
  statsYellow: "#FF891C",
  statsYellow100: "#FF891C",
  statsYellow10: "#FFF5E6",

  // PURPLE
  purple: "#6E57E1",
  purple100: "#6E57E1",
  purple90: "#7A62F4",
  purple80: "#949FFA",
  purple60: "#B1B9FC",
  purple40: "#CDD2FD",
  purple20: "#E9ECFE",
  purple10: "#EEEBFF",

  // LIGHT BLUE
  lightBlue: "#45AAFF",
  lightBlue100: "#45AAFF",
  lightBlue80: "#6CBCFF",
  lightBlue60: "#93CEFF",
  lightBlue40: "#BAE0FF",
  lightBlue20: "#E1F1FF",
  linkedInBlue: "#2867B2",
  linkedInBlueHover: "#307CD7",
  linkedInBlue90: "#307CD7",
  facebookBlue: "#1877F2",

  // RED
  red: "#D7373F",
  red100: "#D7373F",
  red90: "#E73C44",
  red80: "#F98888",
  red60: "#FAA7A7",
  red40: "#FCC7C7",
  red20: "#FEE7E7",
  red10: "#FFEEEF",
  statsRed: "#EF5533",
  statsRed100: "#EF5533",
  statsRed10: "#FEE7E7",

  // GREEN
  green: "#058900",
  green100: "#058900",
  green90: "#059E00",
  green80: "#53B698",
  green60: "#81C9B3",
  green40: "#AEDDCF",
  green20: "#DCF0EA",
  green10: "#EAFFEA",
  statsGreen: "#039900",
  statsGreen100: "#039900",
  statsGreen10: "#DCF0EA",

  // WHITE
  white: "#ffffff",
  semiWhite: "#F5F7FA",

  // BLACK
  black: "#25282B",
  black100: "#25282B",
  black80: "#4C4F51",
  black60: "#737578",
  black50: "#87888B",
  black40: "#9B9C9D",
  black20: "#C1C2C4",
  black10: "#D6D6D7",
  black5: "#EDEDED",

  // GREY
  grey: "#a8a9aa",
  lightGrey: "rgba(0, 0, 0, 0.12)",

  // BACKGROUND
  backgroundLight: "#F5F7FA",
  backgroundDark: "#E7EAF0",
  backgroundWhite: "#FFFFFF",
};

export default colors;
export const objectMap = (obj: typeof colors) =>
  Object.entries(obj).map(([k]) => `${k}`);

export const colorList = objectMap(colors);
