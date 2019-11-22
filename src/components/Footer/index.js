import React from 'react'

import theme from '../../styles/theme'

export default function Footer(props) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '5px',
        backgroundColor: theme.primaryDefault
      }}
    />
  )
}
