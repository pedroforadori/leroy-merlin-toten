import React from 'react'

import { Container } from './style'

export default function SideText({ color, title, subTitle, zIndex = 0, ...props }) {
  return (
    <Container color={color} zIndex={zIndex}>
      <div />
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </Container>
  )
}
