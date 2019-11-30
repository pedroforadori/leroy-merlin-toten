import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { Container, IconWrapper } from './style'
import LogoIcon from '../icons/LogoIcon'

import { setEditSetup, getDepartmentName } from '../../services/auth'

export default function Header(props) {
  const { pathname } = useLocation()
  let history = useHistory()

  const handleRedirect = () => {
    setEditSetup('true')

    history.push('/setup')
  }

  return (
    <Container>
      <IconWrapper>
        <LogoIcon onClick={handleRedirect} />
      </IconWrapper>

      {pathname === '/categories' && <p>{getDepartmentName()}</p>}
    </Container>
  )
}
