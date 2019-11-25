import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.span`
  div {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 150px solid transparent;
    border-left: 150px solid ${theme.white};
    border-bottom: 150px solid transparent;
    /* bottom: -97px;
           right: -22px;
           transform: rotate(45deg); */
  }

  svg {
    position: absolute;
    bottom: 38px;
    right: 38px;
  }

  @media (orientation: landscape) {
    div {
      bottom: -97px;
      right: -22px;
      transform: rotate(45deg);
    }

    svg {
      bottom: 38px;
      right: 38px;
    }
  }

  @media (orientation: portrait) {
    div {
      top: -97px;
      right: -22px;
      transform: rotate(-45deg);
    }

    svg {
      top: 30px;
      right: 30px;
    }
  }
`
