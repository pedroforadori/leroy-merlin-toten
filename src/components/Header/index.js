import React from 'react'

import LogoIcon from '../icons/LogoIcon'

export default function Header(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '107px',
        width: '100%',
        paddingLeft: '46px'
      }}
    >
      <LogoIcon />
    </div>
  )
}
