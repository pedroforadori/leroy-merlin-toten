import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.button`
  width: 138px;
  height: 53px;
  background-color: ${theme.primaryDefault};
  color: ${theme.white};
  font-size: 18px;
  line-height: 22px;
  border: 2px solid ${theme.primaryDefault};
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;

  :disabled {
    background-color: ${theme.gray};
    border-color: ${theme.gray};
  }

  :focus {
    background-color: ${theme.primaryPressed};
    border-color: ${theme.primaryPressed};
  }

  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      bottom: 40px;
      right: 40px;
    `}
`
