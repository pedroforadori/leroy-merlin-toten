import React from 'react'

import { Container } from './style'

export default function SideText({ color, zIndex = 0, ...props }) {
  return (
    <Container color={color} zIndex={zIndex}>
      <div />
    </Container>
  )
}
