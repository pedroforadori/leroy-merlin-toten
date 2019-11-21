import styled from 'styled-components'

export const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;

  @media (orientation: landscape) {
    background-image: url(${({ src }) => src && src[0]});
  }

  @media (orientation: portrait) {
    background-image: url(${({ src }) => src && src[1]});
  }
`
