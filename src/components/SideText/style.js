import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.span`
  div,
  h1,
  p {
    z-index: ${({ zIndex }) => zIndex};
  }

  div {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 275px solid transparent;
    border-right: 275px solid ${({ color }) => color};
    border-bottom: 275px solid transparent;
    transform: rotate(45deg);
  }

  h1 {
    position: absolute;
    font-size: 48px;
    line-height: 48px;
    color: ${theme.textYellow};
    width: 212px;
    height: 100px;
    /* word-wrap: break-word; */
  }

  p {
    position: absolute;
    font-size: 18px;
    line-height: 22px;
    color: ${theme.white};
    width: 170px;
    height: 66px;
  }

  @media (orientation: landscape) {
    div {
      top: -178px;
      left: -40px;
    }

    h1 {
      top: 36px;
      left: 36px;
    }

    p {
      top: 140px;
      left: 36px;
    }
  }

  @media (orientation: portrait) {
    div {
      bottom: 17px;
      left: -40px;
    }

    h1 {
      bottom: 255px;
      left: 36px;
    }

    p {
      bottom: 185px;
      left: 36px;
    }
  }
`
