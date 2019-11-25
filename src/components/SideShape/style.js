import styled from 'styled-components'

export const Container = styled.span`
  div {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 100px solid transparent;
    border-left: 100px solid ${({ color }) => color};
    border-bottom: 100px solid transparent;
    transform: rotate(45deg);
    z-index: ${({ zIndex }) => zIndex};
    overflow: hidden;
  }

  @media (orientation: landscape) {
    div {
      display: none;
    }
  }

  @media (orientation: portrait) {
    div {
      bottom: 255px;
      left: 345px;
    }
  }
`
