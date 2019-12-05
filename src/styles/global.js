import { createGlobalStyle } from 'styled-components'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
  }

  html, body, #root {
    height: 100vh;
  }

  /* #root {
    display: flex;
    flex-direction: column;
  } */
  
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    color: ${theme.textDefault};
    background-color: ${theme.white};
    font-family: 'Leroy Merlin Sans';
    overscroll-behavior-y: contain;
  }
`

export default GlobalStyle
