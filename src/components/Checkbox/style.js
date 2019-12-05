import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  white-space: nowrap;
`

export const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;
  background-color: ${({ checked }) => (checked ? theme.primaryDefault : theme.white)};
  border: 1px solid ${({ checked }) => (checked ? theme.primaryDefault : theme.gray)};
  border-radius: 3px;
  transition: all 150ms ease;

  svg {
    top: 0;
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`
