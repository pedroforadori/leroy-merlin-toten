import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 107px;
  width: 100%;

  p {
    font-size: 64px;
    line-height: 77px;
    font-weight: ${theme.fontSemibold};
    color: ${theme.primaryDefault};
  }
`

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 107px;
  height: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
`
