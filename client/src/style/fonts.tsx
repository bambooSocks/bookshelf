import {createGlobalStyle} from "styled-components"
import RobotoSlabTtf from "./RobotoSlab-Regular.ttf"

export default createGlobalStyle`
  @font-face {
  font-family: "Roboto Slab";
  src: url(${RobotoSlabTtf}) format('truetype');
  font-display: swap;
}
`
