import React from 'react'

import { Container, HiddenCheckbox, StyledCheckbox } from './style'

import CheckIcon from '../icons/CheckIcon'

export default function Checkbox({ checked, ...props }) {
  return (
    <Container>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <CheckIcon />
      </StyledCheckbox>
    </Container>
  )
}
