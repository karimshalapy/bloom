import { create } from "@storybook/theming/create";
//@ts-expect-error
import LogoWithText from "../src/assets/logo-with-text.svg";

export default create({
  base: "light",
  brandTitle: "Bloom",
  brandImage: LogoWithText,
  colorSecondary: "#00999e",
  appBg: "#faf8f5",
  appContentBg: "#faf8f5",
  appPreviewBg: "#faf8f5",
  barBg: "#faf8f5",
  inputBg: "#faf8f5",
});
