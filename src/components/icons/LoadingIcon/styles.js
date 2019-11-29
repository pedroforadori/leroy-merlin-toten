import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg)
  }
  
  to {
    transform: rotate(360deg)
  }
`

export const Spinner = styled.svg`
  animation: ${rotate360} 2s linear infinite;
`
